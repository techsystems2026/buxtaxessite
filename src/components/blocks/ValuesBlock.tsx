'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Users, HeartHandshake, CheckCircle2, Star } from 'lucide-react'

interface ValueItem {
    title?: string | null
    description?: string | null
    icon?: string
}

interface ValuesBlockProps {
    heading?: string
    subtitle?: string
    values?: ValueItem[]
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    shield: Shield,
    award: Award,
    users: Users,
    hand: HeartHandshake,
    check: CheckCircle2,
    star: Star,
}

const defaultValues = [
    { title: 'Ответственность', description: 'Мы несем полную материальную ответственность за свою работу. Все риски застрахованы.', icon: 'shield' },
    { title: 'Экспертность', description: 'Наши бухгалтеры постоянно проходят курсы повышения квалификации.', icon: 'award' },
    { title: 'Конфиденциальность', description: 'Гарантируем сохранность вашей коммерческой тайны и персональных данных.', icon: 'check' },
    { title: 'Партнерство', description: 'Мы не просто исполнители, а ваши надежные партнеры.', icon: 'hand' },
]

export function ValuesBlock({
    heading = 'НАШИ ЦЕННОСТИ',
    subtitle = 'То, на чем строится наша работа и доверие наших клиентов.',
    values = defaultValues,
}: ValuesBlockProps) {
    return (
        <section className="py-24 bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold text-slate-900 uppercase mb-4">{heading}</h2>
                    {subtitle && <p className="text-slate-600 max-w-2xl mx-auto">{subtitle}</p>}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => {
                        const Icon = iconMap[value.icon || 'shield'] || Shield
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
