import React from 'react'

interface PrintResultsProps {
    title: string
    items: { label: string; value: string | number; isTotal?: boolean; highlight?: boolean }[]
    footerText?: string
}

export function PrintResults({ title, items, footerText }: PrintResultsProps) {
    return (
        <div className="hidden print:block print:p-8 font-sans">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-slate-900">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                        BT
                    </div>
                    <div>
                        <div className="font-bold text-xl text-slate-900">BUX&TAXES</div>
                        <div className="text-sm text-slate-500">Профессиональная бухгалтерия</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm text-slate-400">Дата расчета</div>
                    <div className="font-bold">{new Date().toLocaleDateString('ru-RU')}</div>
                </div>
            </div>

            {/* Content */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-6 uppercase">{title}</h1>

                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                    <table className="w-full">
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index} className={item.isTotal ? "text-lg font-bold" : "text-base"}>
                                    <td className={`py-3 ${item.isTotal ? "pt-6 border-t font-bold text-slate-900" : "text-slate-600"} `}>
                                        {item.label}
                                    </td>
                                    <td className={`py-3 text-right ${item.isTotal ? "pt-6 border-t font-bold text-slate-900" : "font-medium text-slate-900"} ${item.highlight ? "text-green-600" : ""}`}>
                                        {typeof item.value === 'number' ? Math.round(item.value).toLocaleString() + ' ₸' : item.value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer info */}
            <div className="mb-12 text-sm text-slate-500 leading-relaxed">
                {footerText || 'Данный расчет является предварительным и носит информационный характер. Для точного расчета налоговой нагрузки с учетом всех особенностей вашего бизнеса рекомендуем обратиться за консультацией к специалисту.'}
            </div>

            {/* Contacts Footer */}
            <div className="flex flex-col gap-2 pt-6 border-t border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Свяжитесь с нами для детального аудита:</div>
                <div className="flex justify-between items-center">
                    <div className="text-slate-600">+7 (777) 123-45-67</div>
                    <div className="text-slate-600">info@buxtaxes.kz</div>
                    <div className="text-slate-600">buxtaxes.kz</div>
                </div>
            </div>
        </div>
    )
}
