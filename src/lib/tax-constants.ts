export const TAX_CONSTANTS = {
    2025: {
        MRP: 3932,
        MZP: 85000,
        OPVR_RATE: 0.025, // 2.5%
        IPN_DEDUCTION_MRP: 14,
        SIMPLIFIED_TAX_RATE: 0.03, // 3%
        VAT_RATE: 0.12, // 12%
        SOCIAL_TAX_RATE_OUR: 0.095, // 9.5% (уменьшается на СО)
        SOCIAL_TAX_REDUCIBLE: true,
    },
    2026: {
        MRP: 4325,
        MZP: 85000,
        OPVR_RATE: 0.035, // 3.5%
        IPN_DEDUCTION_MRP: 30, // Increased to 30 MRP
        SIMPLIFIED_TAX_RATE: 0.04, // Increased to 4%
        VAT_RATE: 0.16, // Increased to 16%
        SOCIAL_TAX_RATE_OUR: 0.06, // Fixed 6%
        SOCIAL_TAX_REDUCIBLE: false, // Not reduced by SO
    }
} as const

export type TaxYear = keyof typeof TAX_CONSTANTS
