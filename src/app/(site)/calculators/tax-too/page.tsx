'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RefreshCw, Download, Mail, Building2, History, ArrowRight, Trash2 } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCalculationHistory, type HistoryItem } from '@/hooks/useCalculationHistory'
import { PrintResults } from '@/components/ui/PrintResults'
import { TAX_CONSTANTS, type TaxYear } from '@/lib/tax-constants'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'

interface TOOResults {
    kpn: number
    socialTax: number | null
    totalTax: number
    netProfit: number
    vat?: number
}

interface TOOInputs {
    revenue: number
    expenses: number
    regime: 'simplified' | 'common'
    isVat: boolean
}

export default function TOOTaxCalculatorPage() {
    const [revenue, setRevenue] = useState<number>(0)
    const [expenses, setExpenses] = useState<number>(0)
    const [regime, setRegime] = useState<'simplified' | 'common'>('simplified')
    const [isVat, setIsVat] = useState<boolean>(false)
    const [year, setYear] = useState<TaxYear>(2025)
    const [results, setResults] = useState<TOOResults | null>(null)
    const [emailLoading, setEmailLoading] = useState(false)

    const { history, saveToHistory, clearHistory } = useCalculationHistory<TOOInputs, TOOResults>('calc_history_too')

    const sendEmail = async () => {
        if (!results) return
        setEmailLoading(true)
        try {
            const regimeName = regime === 'simplified' ? 'Упрощенка' : 'ОУР'
            const message = `Расчет налогов ТОО (${regimeName}, ${year}):
Доход: ${revenue} ₸
Расход: ${expenses} ₸
КПН: ${results.kpn} ₸
${results.socialTax !== null ? `Соц. налог: ${results.socialTax} ₸` : ''}
${results.vat ? `НДС: ${results.vat} ₸` : ''}
Итого налогов: ${results.totalTax} ₸
Чистая прибыль: ${results.netProfit} ₸`

            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Calculator User',
                    phone: 'requested via calc',
                    message: message,
                    source: 'TOO Tax Calculator'
                }),
            })

            if (response.ok) {
                alert('Запрос на отправку результатов принят! Мы вышлем расчет на вашу почту.')
            }
        } catch {
            alert('Ошибка при отправке.')
        } finally {
            setEmailLoading(false)
        }
    }

    const calculate = () => {
        if (revenue < 0) return

        const constants = TAX_CONSTANTS[year]
        let kpn = 0
        let socialTax = 0
        let totalTax = 0
        let vat = 0

        if (regime === 'simplified') {
            // Simplified Regime (Упрощенка)
            // Tax Rate: 3% (2025) or 4% (2026)
            const rate = constants.SIMPLIFIED_TAX_RATE
            const baseTax = revenue * rate
            kpn = baseTax / 2
            socialTax = baseTax / 2
            // Note: Social tax can be reduced by social contributions (SO), but for estimation we show max

            totalTax = kpn + socialTax
        } else {
            // Common regime (ОУР)
            // 20% KPN from Net Income (Revenue - Expenses)
            const profitBeforeTax = revenue - expenses
            if (profitBeforeTax > 0) {
                kpn = profitBeforeTax * 0.20
            } else {
                kpn = 0
            }

            // Social Tax Logic update for 2026
            if (year === 2026) {
                // 2026: Fixed 6% Social Tax, NOT reducible by SO
                // But base for Social Tax is usually payroll fund, not revenue/profit.
                // Since we don't input payroll here yet, we should clarify this limitation or approximate.
                // For estimation purpose in this calculator ("Tax Burden"), we focus on Corporate Tax (KPN).
                // Let's keep Social Tax as 0 for OUR here (as it depends on salary), BUT add specific note or simple calc if margin allows.
                // Or better: Show only KPN as main tax.
                socialTax = 0
            } else {
                // 2025: 9.5% reduced by SO. Also salary based.
                socialTax = 0
            }

            totalTax = kpn
        }

        if (isVat) {
            // VAT Rate: 12% (2025) or 16% (2026)
            const vatRate = constants.VAT_RATE
            vat = revenue * vatRate
            totalTax += vat
        }

        const netProfit = (revenue - expenses) - totalTax

        const newResults = {
            kpn,
            socialTax: regime === 'simplified' ? socialTax : null,
            totalTax,
            netProfit,
            vat: isVat ? vat : 0
        }

        setResults(newResults)

        const inputs: TOOInputs = { revenue, expenses, regime, isVat }
        const title = `${regime === 'simplified' ? 'Упрощенка' : 'ОУР'} (${year}): ${revenue.toLocaleString()} ₸`
        saveToHistory(title, inputs, newResults)
    }

    const loadFromHistory = (item: HistoryItem<TOOInputs, TOOResults>) => {
        const inputs = item.inputs
        setRevenue(inputs.revenue)
        setExpenses(inputs.expenses)
        setRegime(inputs.regime)
        setIsVat(inputs.isVat)
        setResults(item.results)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <main className="bg-slate-50 py-24 min-h-screen">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4 uppercase">КАЛЬКУЛЯТОР НАЛОГОВ ТОО</h1>
                    <p className="text-xl text-slate-600">Рассчитайте предварительную налоговую нагрузку для вашей компании.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="rounded-[2rem] border-none shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="text-primary" />
                                Параметры бизнеса
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3">
                                <Label>Год расчета</Label>
                                <Select value={year.toString()} onValueChange={(v) => setYear(Number(v) as TaxYear)}>
                                    <SelectTrigger className="h-14 text-lg rounded-xl">
                                        <SelectValue placeholder="Выберите год" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2025">2025 год</SelectItem>
                                        <SelectItem value="2026">2026 год</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-3">
                                <Label>Режим налогообложения</Label>
                                <RadioGroup defaultValue="simplified" value={regime} onValueChange={(v) => setRegime(v as 'simplified' | 'common')} className="grid grid-cols-2 gap-4">
                                    <div>
                                        <RadioGroupItem value="simplified" id="simplified" className="peer sr-only" />
                                        <Label
                                            htmlFor="simplified"
                                            className="flex flex-col items-center justify-between rounded-xl border-2 border-muted p-4 hover:bg-slate-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                                        >
                                            <span className="font-bold">Упрощенка</span>
                                            <span className="text-xs text-muted-foreground mt-1">{year === 2025 ? '3%' : '4%'} от оборота</span>
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="common" id="common" className="peer sr-only" />
                                        <Label
                                            htmlFor="common"
                                            className="flex flex-col items-center justify-between rounded-xl border-2 border-muted p-4 hover:bg-slate-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                                        >
                                            <span className="font-bold">ОУР</span>
                                            <span className="text-xs text-muted-foreground mt-1">20% от прибыли</span>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="revenue">Доходы (с НДС если есть)</Label>
                                <div className="relative">
                                    <Input
                                        id="revenue"
                                        type="number"
                                        placeholder="Например: 5000000"
                                        className="h-14 text-lg pl-4 pr-12 rounded-xl"
                                        value={revenue || ''}
                                        onChange={(e) => setRevenue(Number(e.target.value))}
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₸</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="expenses">Расходы (подтвержденные)</Label>
                                <div className="relative">
                                    <Input
                                        id="expenses"
                                        type="number"
                                        placeholder="Например: 3000000"
                                        className="h-14 text-lg pl-4 pr-12 rounded-xl"
                                        value={expenses || ''}
                                        onChange={(e) => setExpenses(Number(e.target.value))}
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₸</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="vat" className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" checked={isVat} onChange={(e) => setIsVat(e.target.checked)} />
                                <Label htmlFor="vat" className="cursor-pointer">Плательщик НДС ({year === 2025 ? '12%' : '16%'})</Label>
                            </div>

                            <Button onClick={calculate} className="w-full h-14 text-lg font-bold rounded-xl bg-purple-600 hover:bg-purple-700">
                                Рассчитать нагрузку
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[2rem] border-none shadow-xl bg-slate-900 text-white">
                        <CardHeader>
                            <CardTitle>Прогноз налогов</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {!results ? (
                                <div className="h-64 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-700 rounded-3xl">
                                    <RefreshCw className="w-12 h-12 mb-4 animate-spin-slow" />
                                    <p>Введите данные для расчета</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div>
                                        <div className="text-slate-400 text-sm mb-1">Итого налогов к уплате</div>
                                        <div className="text-4xl font-bold text-purple-400">{Math.round(results.totalTax).toLocaleString()} ₸</div>
                                    </div>

                                    <div className="space-y-3 pt-6 border-t border-slate-800">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">КПН (Корпоративный налог 20%)</span>
                                            <span className="font-medium">{Math.round(results.kpn).toLocaleString()} ₸</span>
                                        </div>
                                        {results.socialTax !== null && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-400">Соц. налог ({regime === 'simplified' ? (year === 2025 ? '1.5%' : '2%') : 'от ФОТ'})</span>
                                                <span className="font-medium">{Math.round(results.socialTax).toLocaleString()} ₸</span>
                                            </div>
                                        )}
                                        {results.vat !== undefined && results.vat > 0 && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-400">НДС ({year === 2025 ? '12%' : '16%'})</span>
                                                <span className="font-medium">{Math.round(results.vat).toLocaleString()} ₸</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
                                        <span className="text-sm font-bold text-slate-300">Расчетная чистая прибыль</span>
                                        <span className="text-xl font-bold text-green-400">{Math.round(results.netProfit).toLocaleString()} ₸</span>
                                    </div>

                                    <div className="p-3 bg-white/5 rounded-lg text-xs text-slate-400 mt-4">
                                        * Расчет является предварительным. Для точной суммы с учетом всех вычетов обратитесь к бухгалтеру.
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* История расчетов */}
                {history.length > 0 && (
                    <div className="mt-12">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                <History className="w-6 h-6 text-slate-400" />
                                История расчетов
                            </h3>
                            <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={clearHistory}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Очистить
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {history.map((item) => (
                                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group cursor-pointer" onClick={() => loadFromHistory(item)}>
                                    <div className="text-xs text-slate-400 mb-2">{new Date(item.date).toLocaleString()}</div>
                                    <div className="font-bold text-lg mb-1">{Math.round(item.results.totalTax).toLocaleString()} ₸</div>
                                    <div className="text-sm text-slate-500 mb-4">{item.title}</div>
                                    <div className="flex items-center text-primary text-sm font-bold group-hover:gap-2 transition-all">
                                        Загрузить <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {results && (
                    <div className="mt-12 bg-white rounded-[2rem] p-8 lg:p-12 shadow-lg border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Сложно разобраться?</h3>
                            <p className="text-slate-600">Налоговое планирование ТОО требует профессионального подхода. Мы поможем снизить нагрузку законными методами.</p>
                        </div>
                        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                            <Button size="lg" className="h-14 px-8 font-bold flex-1 lg:flex-none print:hidden bg-purple-600 hover:bg-purple-700" asChild>
                                <Link href="/contacts">Консультация эксперта</Link>
                            </Button>
                            <Button variant="outline" size="lg" className="h-14 px-8 font-bold flex-1 lg:flex-none border-slate-200 print:hidden" onClick={() => window.print()}>
                                <Download className="w-5 h-5 mr-2" />
                                PDF
                            </Button>
                            <Button variant="outline" size="lg" className="h-14 px-8 font-bold flex-1 lg:flex-none border-slate-200 print:hidden" onClick={sendEmail} disabled={emailLoading}>
                                <Mail className="w-5 h-5 mr-2" />
                                Email
                            </Button>
                        </div>
                    </div>
                )}

                {/* Print Layout */}
                {results && (
                    <PrintResults
                        title={`Расчет налогов ТОО (${regime === 'simplified' ? 'Упрощенка' : 'ОУР'} ${year})`}
                        items={[
                            { label: 'Доход', value: revenue },
                            { label: 'Расход', value: expenses },
                            { label: 'КПН (Корпоративный налог)', value: results.kpn },
                            ...(results.socialTax !== null ? [{ label: 'Социальный налог', value: results.socialTax }] : []),
                            ...(results.vat !== undefined && results.vat > 0 ? [{ label: `НДС (${year === 2025 ? '12%' : '16%'})`, value: results.vat }] : []),
                            { label: 'ИТОГО НАЛОГОВ', value: results.totalTax, isTotal: true, highlight: true },
                            { label: 'Чистая прибыль', value: results.netProfit, isTotal: true }
                        ]}
                    />
                )}
            </div>
        </main>
    )
}
