'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface HeroBlockProps {
    heading?: string
    highlightedWord?: string
    subtitle?: string
    bulletPoints?: Array<{ point?: string | null }>
    stats?: Array<{ value?: string | null; label?: string | null; isPrimary?: boolean }>
    ctaButtons?: Array<{
        label?: string | null
        url?: string | null
        variant?: string
        icon?: string
    }>
    bottomCard?: {
        enabled?: boolean
        title?: string | null
        subtitle?: string | null
    }
}

export function HeroBlock({
    heading = 'ВАША БУХГАЛТЕРИЯ В НАДЕЖНЫХ РУКАХ',
    highlightedWord,
    subtitle,
    bulletPoints = [],
    stats = [],
    ctaButtons = [],
    bottomCard,
}: HeroBlockProps) {
    return (
        <section className="relative bg-slate-50 py-20 lg:py-32 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-7xl mb-6 uppercase leading-[0.9]">
                            {highlightedWord && heading.includes(highlightedWord) ? (
                                <>
                                    {heading.split(highlightedWord)[0]}
                                    <span className="text-primary">{highlightedWord}</span>
                                    {heading.split(highlightedWord)[1]}
                                </>
                            ) : (
                                heading
                            )}
                        </h1>
                        {subtitle && (
                            <p className="text-xl leading-8 text-slate-600 mb-8 max-w-xl">
                                {subtitle}
                            </p>
                        )}

                        {bulletPoints.length > 0 && (
                            <ul className="space-y-4 mb-10">
                                {bulletPoints.map((point, index) => (
                                    point.point && (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + index * 0.1 }}
                                            className="flex items-center gap-3 text-slate-700 font-medium"
                                        >
                                            <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                                            <span>{point.point}</span>
                                        </motion.li>
                                    )
                                ))}
                            </ul>
                        )}

                        {ctaButtons.length > 0 && (
                            <div className="flex flex-wrap gap-4">
                                {ctaButtons.map((button, index) => (
                                    button.label && button.url && (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                        >
                                            <Button
                                                size="lg"
                                                variant={(button.variant as 'default' | 'secondary' | 'outline' | 'ghost' | 'link') || 'default'}
                                                className="h-14 px-8 text-lg font-bold"
                                                asChild
                                            >
                                                <Link href={button.url}>
                                                    {button.icon === 'whatsapp' && <MessageCircle className="mr-2 h-6 w-6 text-green-500" />}
                                                    {button.icon === 'telegram' && <ArrowRight className="mr-2 h-6 w-6" />}
                                                    {button.label}
                                                </Link>
                                            </Button>
                                        </motion.div>
                                    )
                                ))}
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-20 lg:mt-0"
                    >
                        {stats.length > 0 ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {stats.map((stat, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + index * 0.1 }}
                                            className={`p-8 rounded-3xl ${stat.isPrimary ? 'bg-primary text-white' : 'bg-white border border-slate-100 shadow-sm'
                                                }`}
                                        >
                                            <div className={`text-4xl font-bold mb-2 ${stat.isPrimary ? 'text-white' : 'text-primary'
                                                }`}>
                                                {stat.value}
                                            </div>
                                            <div className={`text-sm font-medium leading-tight ${stat.isPrimary ? 'text-white/80' : 'text-slate-500'
                                                }`}>
                                                {stat.label}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {bottomCard?.enabled !== false && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="p-8 bg-slate-900 rounded-3xl text-white"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-xl font-bold">
                                                B
                                            </div>
                                            <div>
                                                <div className="font-bold text-lg">{bottomCard?.title || 'Bux & Taxes'}</div>
                                                <div className="text-slate-400 text-sm">{bottomCard?.subtitle || 'Ваш надежный партнер'}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="p-8 rounded-3xl bg-primary text-white"
                                    >
                                        <div className="text-4xl font-bold mb-2">10+</div>
                                        <div className="text-sm font-medium leading-tight text-white/80">Лет на рынке</div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm"
                                    >
                                        <div className="text-4xl font-bold mb-2 text-primary">5000+</div>
                                        <div className="text-sm font-medium leading-tight text-slate-500">Сданных отчетов</div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm"
                                    >
                                        <div className="text-4xl font-bold mb-2 text-primary">15+</div>
                                        <div className="text-sm font-medium leading-tight text-slate-500">Бухгалтеров</div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm"
                                    >
                                        <div className="text-4xl font-bold mb-2 text-primary">90%</div>
                                        <div className="text-sm font-medium leading-tight text-slate-500">Удаленная работа</div>
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="p-8 bg-slate-900 rounded-3xl text-white"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-xl font-bold">
                                            B
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg">Bux & Taxes</div>
                                            <div className="text-slate-400 text-sm">Ваш надежный партнер</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
