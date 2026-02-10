'use client'

import { motion } from 'framer-motion'
import { Briefcase, Users, FileText, Clock, Star, Shield } from 'lucide-react'

interface StatItem {
    value?: string | null
    label?: string | null
    icon?: string
    isPrimary?: boolean
}

interface StatsGridBlockProps {
    stats?: StatItem[]
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    briefcase: Briefcase,
    users: Users,
    file: FileText,
    clock: Clock,
    star: Star,
    shield: Shield,
}

export function StatsGridBlock({ stats = [] }: StatsGridBlockProps) {
    const defaultStats = [
        { value: '10+', label: 'Лет на рынке', icon: 'star', isPrimary: true },
        { value: '200+', label: 'Клиентов', icon: 'users' },
        { value: '0', label: 'Штрафов у клиентов', icon: 'shield' },
        { value: '24/7', label: 'Поддержка', icon: 'clock' },
    ]

    const displayStats = stats.length > 0 ? stats : defaultStats

    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {displayStats.map((stat, index) => {
                        const Icon = iconMap[stat.icon || 'briefcase'] || Briefcase
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-8 rounded-3xl text-center ${stat.isPrimary ? 'bg-primary text-white' : 'bg-slate-50 border border-slate-100'
                                    }`}
                            >
                                <Icon className={`w-8 h-8 mx-auto mb-4 ${stat.isPrimary ? 'text-white' : 'text-primary'
                                    }`} />
                                <div className={`text-4xl font-bold mb-2 ${stat.isPrimary ? 'text-white' : 'text-primary'
                                    }`}>
                                    {stat.value}
                                </div>
                                <div className={`text-sm font-medium leading-tight ${stat.isPrimary ? 'text-white/80' : 'text-slate-500'
                                    }`}>
                                    {stat.label}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
