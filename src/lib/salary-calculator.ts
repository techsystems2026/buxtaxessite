import { TAX_CONSTANTS, type TaxYear } from './tax-constants'

export type CalculationMethod = 'gross' | 'net'
export type EmployeeCategory = 'employee' | 'pensioner' | 'disabled' | 'gph'

export interface SalaryInputs {
    amount: number
    year: TaxYear
    method: CalculationMethod
    category: EmployeeCategory
    hasDeduction: boolean // Применять вычет (14 или 30 МРП)
    isResident: boolean
}

export interface DetailedTax {
    name: string
    amount: number
    rate?: number
    note?: string
}

export interface SalaryResults {
    gross: number
    net: number

    // Taxes from Employee
    opv: number
    vosms: number
    ipn: number

    // Taxes from Employer
    so: number
    osms: number
    opvm: number // ОПВР
    sn: number

    totalEmployerCost: number
}

/**
 * Основная функция расчета.
 * Если метод 'net', сначала подбирает Gross, затем считает налоги.
 */
export function calculateSalary(inputs: SalaryInputs): SalaryResults {
    if (inputs.method === 'net') {
        return calculateReverse(inputs)
    }
    return calculateDirect(inputs.amount, inputs)
}

function calculateDirect(grossAmount: number, inputs: SalaryInputs): SalaryResults {
    const { year, category, hasDeduction, isResident } = inputs
    const K = TAX_CONSTANTS[year]
    const MRP = K.MRP
    const MZP = K.MZP

    // 1. ОПВ (Pension)
    // Пенсионеры не платят. Инвалиды 1,2 гр бессрочно - не платят (по умолчанию считаем так).
    // ГПХ платят.
    let opvRate = 0.10
    if (category === 'pensioner' || category === 'disabled') {
        opvRate = 0
    }

    let opvBase = grossAmount
    // Max base 50 MZP
    if (opvBase > 50 * MZP) opvBase = 50 * MZP

    const opv = opvBase * opvRate

    // 2. ВОСМС (Health Employee)
    // Пенсионеры не платят. Инвалиды не платят.
    // ГПХ платят.
    let vosmsRate = 0.02
    if (category === 'pensioner' || category === 'disabled') {
        vosmsRate = 0
    }

    let vosmsBase = grossAmount
    // Max base 10 MZP
    if (vosmsBase > 10 * MZP) vosmsBase = 10 * MZP

    const vosms = vosmsBase * vosmsRate

    // 3. ИПН (Income Tax)
    // Base = Gross - OPV - VOSMS - Deduction (if applicable)
    // Deduction for disabled: 882 MRP per year. Here we simplify to monthly logic? 
    // Let's assume standard monthly calc. Disabled usually have huge deduction (882 MRP/year ~ 73 MRP/month).
    // Standard deduction: 14 MRP (2025) or 30 MRP (2026).

    let deductionAmount = 0
    if (hasDeduction && category !== 'gph') { // ГПХ обычно не применяют вычет у источника, хотя могут. По умолчанию для калькулятора часто выключают, но оставим флаг.
        deductionAmount = K.IPN_DEDUCTION_MRP * MRP
    }

    if (category === 'disabled') {
        // Дополнительный вычет для инвалидов (882 МРП в год / 12 ~ 73.5 МРП в мес)
        // Упрощенно добавим большой вычет, который покроет почти любую зп
        deductionAmount += 73.5 * MRP
    }

    let ipnBase = grossAmount - opv - vosms - deductionAmount
    if (ipnBase < 0) ipnBase = 0

    // 90% Adjustment if income < 25 MRP
    // Income for adjustment check: Gross - OPV - VOSMS? Or just Gross?
    // Usually: (Gross - OPV - VOSMS) < 25 MRP
    const incomeForAdj = grossAmount - opv - vosms
    if (incomeForAdj < 25 * MRP && category !== 'gph') {
        ipnBase = ipnBase * 0.1 // 90% reduction means taxable base is 10%
    }

    // Rate 10% (for residents) or 20% (non-residents)? 
    // Simplified: Residents 10%. Non-residents usually 10% too for labor income (but without deductions).
    // Let's assume 10% for simplicity of "Salary Calc".
    const ipn = ipnBase * 0.10

    const net = grossAmount - opv - vosms - ipn

    // --- Employer Taxes ---

    // 4. SO (Social Deductions)
    // Pensioners: 0
    // GPH: 0 (Заказчик не платит СО)
    let soRate = 0.035
    if (category === 'pensioner' || category === 'gph') {
        soRate = 0
    }

    let soBase = grossAmount - opv
    // Limits: Min 1 MZP, Max 7 MZP
    if (soBase < MZP) soBase = MZP
    if (soBase > 7 * MZP) soBase = 7 * MZP

    // Exception: If actual salary is less than base, SO is calc from min base? Yes.
    // But if category is employee.

    const so = soBase * soRate

    // 5. OSMS (Health Employer)
    // Pensioners: 0
    // Disabled: 0
    // GPH: 0 (Заказчик не платит ОСМС за ГПХ, только ВОСМС удерживает)
    let osmsRate = 0.03
    if (category === 'pensioner' || category === 'disabled' || category === 'gph') {
        osmsRate = 0
    }

    let osmsBase = grossAmount
    if (osmsBase > 10 * MZP) osmsBase = 10 * MZP

    const osms = osmsBase * osmsRate

    // 6. OPVR (Employer Pension)
    // Pensioners: 0
    // Disabled 1,2: 0
    // GPH: 0
    let opvrRate: number = K.OPVR_RATE
    if (category === 'pensioner' || category === 'disabled' || category === 'gph') {
        opvrRate = 0
    }
    // Max base same as OPV? Usually yes.
    let opvrBase = grossAmount
    if (opvrBase > 50 * MZP) opvrBase = 50 * MZP

    const opvm = opvrBase * opvrRate

    // 7. SN (Social Tax)
    // GPH: 0
    // Pensioners: base - 0 - 0 * 9.5% ...

    let sn = 0
    if (category !== 'gph') {
        const snBase = grossAmount - opv - vosms
        // If negative base? Should not be.
        const taxableSnBase = snBase > 0 ? snBase : 0

        if (K.SOCIAL_TAX_REDUCIBLE) {
            // 2025: 9.5% - SO
            let calculatedSn = (taxableSnBase * K.SOCIAL_TAX_RATE_OUR) - so
            if (calculatedSn < 0) calculatedSn = 0
            sn = calculatedSn
        } else {
            // 2026: Fixed 6%
            sn = taxableSnBase * K.SOCIAL_TAX_RATE_OUR
        }
    }

    return {
        gross: grossAmount,
        net,
        opv,
        vosms,
        ipn,
        so,
        osms,
        opvm,
        sn,
        totalEmployerCost: grossAmount + so + osms + opvm + sn
    }
}

/**
 * Обратный расчет (Net -> Gross)
 * Использует бинарный поиск для подбора Gross.
 */
function calculateReverse(inputs: SalaryInputs): SalaryResults {
    const targetNet = inputs.amount

    // Эвристические границы
    let low = targetNet
    let high = targetNet * 2 // Обычно налоги не превышают 50%, так что x2 надежно
    let gross = low

    // Binary search
    for (let i = 0; i < 30; i++) { // 30 итераций достаточно для точности до копеек
        gross = (low + high) / 2
        const res = calculateDirect(gross, inputs)

        if (Math.abs(res.net - targetNet) < 0.1) {
            // Found enough precision
            return res
        }

        if (res.net < targetNet) {
            // Need more gross
            low = gross
        } else {
            // Need less gross
            high = gross
        }
    }

    return calculateDirect(gross, inputs)
}
