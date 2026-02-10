'use client'

import { motion } from 'framer-motion'
import { ContactForm } from '@/components/forms/ContactForm'

interface ContactFormBlockProps {
    heading?: string
    subtitle?: string
    successMessage?: string
}

export function ContactFormBlock({
    heading = 'ОСТАВЬТЕ ЗАЯВКУ',
    subtitle = 'Мы свяжемся с вами в течение 15 минут',
    successMessage = 'Заявка успешно отправлена!',
}: ContactFormBlockProps) {
    return (
        <section className="py-24 bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 uppercase">{heading}</h2>
                    {subtitle && <p className="text-lg text-slate-600">{subtitle}</p>}
                </motion.div>

                <div className="max-w-2xl mx-auto">
                    <ContactForm />
                </div>
            </div>
        </section>
    )
}
