'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface CTAButton {
    label?: string | null
    url?: string | null
    variant?: string
}

interface CTABlockProps {
    heading?: string
    subtitle?: string
    buttons?: CTAButton[]
    backgroundColor?: string
}

export function CTABlock({
    heading = 'Готовы начать работать с нами?',
    subtitle = 'Оставьте заявку и получите бесплатную консультацию',
    buttons = [
        { label: 'Получить консультацию', url: '/contacts', variant: 'primary' },
    ],
    backgroundColor = 'primary',
}: CTABlockProps) {
    const bgColors: Record<string, string> = {
        primary: 'bg-primary',
        dark: 'bg-slate-900',
        light: 'bg-slate-100',
    }

    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className={`${bgColors[backgroundColor] || bgColors.primary} rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden`}
                >
                    {/* Decoration */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-black/10 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8">{heading}</h2>
                        {subtitle && (
                            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">{subtitle}</p>
                        )}
                        <div className="flex flex-wrap justify-center gap-4">
                            {buttons.map((button, index) => (
                                button.label && button.url && (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Button
                                            size="lg"
                                            variant={(button.variant as 'default' | 'secondary' | 'outline' | 'ghost' | 'link') || 'default'}
                                            className="h-16 px-10 text-lg font-bold"
                                            asChild
                                        >
                                            <Link href={button.url}>{button.label}</Link>
                                        </Button>
                                    </motion.div>
                                )
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
