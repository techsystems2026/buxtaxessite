import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calculator, Building2, Wallet, ArrowRight } from 'lucide-react'

export function ToolsPreview() {
    const tools = [
        {
            title: 'Калькулятор ИП',
            description: 'Расчет налогов по упрощенке (3% / 4%). История расчетов, экспорт в PDF.',
            icon: Calculator,
            href: '/calculators/tax-ip',
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10'
        },
        {
            title: 'Калькулятор ТОО',
            description: 'Сравнение режимов ОУР и УПР. Расчет НДС, КПН и чистой прибыли.',
            icon: Building2,
            href: '/calculators/tax-too',
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10'
        },
        {
            title: 'Калькулятор Зарплаты',
            description: 'Расчет налогов с ФОТ. Поддержка обратного счета (Net to Gross) и всех льгот 2026.',
            icon: Wallet,
            href: '/calculators/salary',
            color: 'text-green-500',
            bgColor: 'bg-green-500/10'
        }
    ]

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4">
                        Полезные инструменты бухгалтера
                    </h2>
                    <p className="text-lg text-slate-600">
                        Бесплатные онлайн калькуляторы для быстрого расчета налогов и зарплаты с учетом последних изменений 2026 года.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tools.map((tool) => (
                        <Card key={tool.href} className="flex flex-col border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                            <CardHeader>
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${tool.bgColor}`}>
                                    <tool.icon className={`w-7 h-7 ${tool.color}`} />
                                </div>
                                <CardTitle className="text-xl font-bold">{tool.title}</CardTitle>
                                <CardDescription className="text-base text-slate-500 leading-relaxed">
                                    {tool.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow" />
                            <CardFooter>
                                <Button asChild className="w-full h-12 text-md font-bold rounded-xl group-hover:bg-primary/90 transition-colors" variant="outline">
                                    <Link href={tool.href}>
                                        Перейти к расчету <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
