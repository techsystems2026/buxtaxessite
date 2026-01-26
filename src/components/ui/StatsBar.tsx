import { TAX_CONSTANTS } from '@/lib/tax-constants'
import { TrendingUp, DollarSign, Euro, Briefcase } from 'lucide-react'

export function StatsBar() {
    const currentYear = 2026
    const constants = TAX_CONSTANTS[currentYear]

    return (
        <div className="bg-slate-900 text-slate-200 py-3 text-sm border-b border-slate-800 overflow-x-auto">
            <div className="container mx-auto px-6 flex items-center justify-between min-w-[600px] gap-8">
                <div className="flex items-center gap-6">
                    <span className="font-bold text-white flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-primary" />
                        {currentYear} год
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400">МРП:</span>
                        <span className="font-medium text-white">{constants.MRP.toLocaleString()} ₸</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400">МЗП:</span>
                        <span className="font-medium text-white">{constants.MZP.toLocaleString()} ₸</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <span className="font-medium text-white">505.50 ₸</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Euro className="w-4 h-4 text-blue-400" />
                        <span className="font-medium text-white">530.20 ₸</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs bg-white/10 px-2 py-1 rounded">
                        <TrendingUp className="w-3 h-3" />
                        Курс НБ РК
                    </div>
                </div>
            </div>
        </div>
    )
}
