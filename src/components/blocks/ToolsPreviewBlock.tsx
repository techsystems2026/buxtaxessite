'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calculator, Building2, Wallet, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ToolItem {
    title?: string | null
    description?: string | null
    href?: string | null
    icon?: string
    color?: string
}

interface ToolsPreviewBlockProps {
    heading?: string
    subtitle?: string
    tools?: ToolItem[]
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    calculator: Calculator,
    building: Building2,
    wallet: Wallet,
}

const colorMap: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
}

const defaultTools = [
    { title: 'Калькулятор ИП', description: 'Расчет налогов по упрощенке', href: '/calculators/tax-ip', icon: 'calculator', color: 'blue' },
    { title: 'Калькулятор Зарплаты', description: 'Расчет налогов с ФОТ', href: '/calculators/salary', icon: 'wallet', color: 'green' },
    { title: 'Калькулятор ТОО', description: 'Расчет налогов для ТОО', href: '/calculators/tax-too', icon: 'building', color: 'purple' },
]

export function ToolsPreviewBlock({
    heading = 'ПОЛЕЗНЫЕ ИНСТРУМЕНТЫ',
    subtitle = 'Бесплатные онлайн-калькуляторы для быстрого расчета налогов',
    tools = defaultTools,
}: ToolsPreviewBlockProps) {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4 uppercase">{heading}</h2>
                    {subtitle && <p className="text-lg text-slate-600">{subtitle}</p>}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tools.map((tool, index) => {
                        const Icon = iconMap[tool.icon || 'calculator'] || Calculator
                        const bgColor = colorMap[tool.color || 'blue'] || colorMap.blue
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="flex flex-col border-none shadow-lg hover:shadow-xl transition-all rounded-[2rem] overflow-hidden bg-white h-full">
                                    <CardHeader className="pb-4">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg ${bgColor}`}>
                                            <Icon className="w-7 h-7" />
                                        </div>
                                        <CardTitle className="text-2xl font-bold">{tool.title}</CardTitle>
                                        <CardDescription className="text-slate-600 text-base mt-2 leading-relaxed">
                                            {tool.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow flex flex-col justify-end pt-4" />
                                    <CardFooter>
                                        <Button className="w-full h-12 text-md font-bold rounded-xl" variant="outline" asChild>
                                            <Link href={tool.href || '#'}>
                                                Перейти к расчету <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
