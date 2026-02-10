'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Briefcase } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ServicesOverviewBlockProps {
    heading?: string
    subtitle?: string
    showCount?: number
    fallbackServices?: Array<{
        title?: string | null
        slug?: string | null
        shortDescription?: string | null
        priceFrom?: string | null
    }>
    showCta?: boolean
}

const defaultServices = [
    { title: 'Бухгалтерское сопровождение ИП', slug: 'ip-bookkeeping', shortDescription: 'Полное ведение бухгалтерии для индивидуальных предпринимателей на всех режимах.', priceFrom: 'от 15 000 ₸' },
    { title: 'Сопровождение ТОО с НДС', slug: 'too-vat', shortDescription: 'Комплексный учет, работа с импортом, экспортом и возмещением НДС.', priceFrom: 'от 70 000 ₸' },
    { title: 'Сопровождение ТОО без НДС', slug: 'too-no-vat', shortDescription: 'Профессиональный учет для малого и среднего бизнеса без НДС.', priceFrom: 'от 40 000 ₸' },
    { title: 'ЭСФ и СНТ', slug: 'esf-snt', shortDescription: 'Выписка электронных счетов-фактур и сопроводительных накладных без ошибок.', priceFrom: 'от 20 000 ₸' },
    { title: 'Восстановление учета', slug: 'recovery', shortDescription: 'Приведем вашу бухгалтерию в порядок и исправим ошибки прошлых периодов.', priceFrom: 'по запросу' },
    { title: 'Налоговый аудит', slug: 'audit', shortDescription: 'Проверка налоговых рисков и профессиональные консультации по оптимизации.', priceFrom: 'от 30 000 ₸' },
]

export function ServicesOverviewBlock({
    heading = 'НАШИ УСЛУГИ',
    subtitle,
    showCount = 6,
    fallbackServices = defaultServices,
    showCta = true,
}: ServicesOverviewBlockProps) {
    const displayServices = (fallbackServices || defaultServices).slice(0, showCount)

    return (
        <section id="services" className="py-24 bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl uppercase">{heading}</h2>
                    {subtitle && <p className="mt-4 text-lg text-slate-600">{subtitle}</p>}
                </motion.div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {displayServices.map((service, index) => (
                        <motion.div
                            key={service.slug || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="flex flex-col border-none shadow-lg hover:shadow-xl transition-shadow rounded-3xl overflow-hidden h-full">
                                <CardHeader className="pb-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                                        <Briefcase className="w-6 h-6" />
                                    </div>
                                    <CardTitle className="text-xl leading-tight font-bold">{service.title}</CardTitle>
                                    <CardDescription className="text-slate-600 mt-2 line-clamp-3">{service.shortDescription}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col justify-end pt-4">
                                    <div className="flex items-center justify-between mt-auto">
                                        <p className="text-primary font-bold text-xl">{service.priceFrom}</p>
                                        <Button variant="ghost" className="text-primary font-bold hover:text-primary hover:bg-primary/5" asChild>
                                            <Link href={`/services/${service.slug}`}>Подробнее →</Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {showCta && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/#services">Все услуги →</Link>
                        </Button>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
