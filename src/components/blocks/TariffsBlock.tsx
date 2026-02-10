'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TariffItem {
    name?: string | null
    price?: string | null
    features?: Array<{ feature?: string | null }>
    format?: string | null
    responsibility?: string | null
}

interface TariffCategory {
    name?: string | null
    tariffs?: TariffItem[]
}

interface TariffsBlockProps {
    heading?: string
    subtitle?: string
    showFromCollection?: boolean
    categories?: TariffCategory[]
    showContactCta?: boolean
}

const defaultCategories = [
    {
        name: 'ИП', tariffs: [
            { name: 'ИП на упрощенке', price: 'от 15 000 ₸', features: [{ feature: 'До 50 операций' }, { feature: 'Сдача 910 формы' }, { feature: 'Консультации' }], format: 'Удаленно', responsibility: 'Полная финансовая ответственность' },
        ]
    },
    {
        name: 'ТОО без НДС', tariffs: [
            { name: 'ТОО на упрощенке', price: 'от 40 000 ₸', features: [{ feature: 'До 100 операций' }, { feature: 'Кадровый учет' }, { feature: 'ЭСФ / СНТ' }], format: 'Удаленно + курьер', responsibility: 'Полная финансовая ответственность по договору' },
        ]
    },
    {
        name: 'ТОО с НДС', tariffs: [
            { name: 'ТОО на ОУР', price: 'от 80 000 ₸', features: [{ feature: 'Любое количество операций' }, { feature: 'Импорт / Экспорт' }, { feature: 'Валютный контроль' }], format: 'Персональный бухгалтер', responsibility: 'Комплексная юридическая и финансовая ответственность' },
        ]
    },
]

export function TariffsBlock({
    heading = 'ТАРИФЫ НА ОБСЛУЖИВАНИЕ',
    subtitle = 'Прозрачное ценообразование без скрытых платежей',
    showFromCollection = true,
    categories = defaultCategories,
    showContactCta = true,
}: TariffsBlockProps) {
    const displayCategories = categories && categories.length > 0 ? categories : defaultCategories

    return (
        <section className="py-24 bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4 uppercase">{heading}</h2>
                    {subtitle && <p className="text-xl text-slate-600 max-w-2xl mx-auto">{subtitle}</p>}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayCategories.map((cat, catIndex) => (
                        <div key={catIndex} className="flex flex-col">
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-2xl font-bold mb-6 text-slate-800 text-center"
                            >
                                {cat.name}
                            </motion.h3>
                            <div className="space-y-6 flex-grow">
                                {(cat.tariffs || []).map((tariff, tariffIndex) => (
                                    <motion.div
                                        key={tariffIndex}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: tariffIndex * 0.1 }}
                                        className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 flex flex-col h-full hover:border-primary/50 transition-colors"
                                    >
                                        <div className="mb-8">
                                            <h4 className="text-xl font-bold text-slate-900 mb-2">{tariff.name}</h4>
                                            <div className="text-3xl font-bold text-primary">{tariff.price}</div>
                                            {tariff.format && <div className="text-sm text-slate-500 mt-1">{tariff.format}</div>}
                                        </div>

                                        <ul className="space-y-4 mb-8 flex-grow">
                                            {(tariff.features || []).map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-start gap-3 text-slate-600 text-sm">
                                                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                    <span>{feature.feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {tariff.responsibility && (
                                            <div className="mb-8 p-4 bg-slate-50 rounded-2xl text-xs text-slate-500 flex gap-2">
                                                <Info className="w-4 h-4 text-primary flex-shrink-0" />
                                                <span>{tariff.responsibility}</span>
                                            </div>
                                        )}

                                        <Button className="w-full h-12 font-bold" asChild>
                                            <Link href="/#contacts">Выбрать тариф</Link>
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {showContactCta && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 bg-slate-900 rounded-[3rem] p-12 text-white text-center"
                    >
                        <h3 className="text-2xl font-bold mb-4">Не нашли подходящий тариф?</h3>
                        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                            Свяжитесь с нами, и мы подготовим индивидуальное предложение.
                        </p>
                        <Button variant="secondary" size="lg" className="h-14 px-8 font-bold" asChild>
                            <Link href="/#contacts">Получить консультацию</Link>
                        </Button>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
