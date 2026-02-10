'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

interface ContactInfoBlockProps {
    heading?: string
    subtitle?: string
    showMap?: boolean
    mapEmbedUrl?: string
    showFromSettings?: boolean
    customContacts?: {
        address?: string | null
        phone?: string | null
        phoneSecondary?: string | null
        email?: string | null
        emailSupport?: string | null
        workingHours?: string | null
        whatsapp?: string | null
    }
}

const defaultContacts = {
    address: 'г. Алматы, пр. Аль-Фараби 17, БЦ "Нурлы Тау"',
    phone: '+7 (777) 123-45-67',
    phoneSecondary: '+7 (727) 321-45-67',
    email: 'info@buxtaxes.kz',
    emailSupport: 'support@buxtaxes.kz',
    workingHours: 'Пн - Пт: 09:00 - 18:00\nСб - Вс: Выходной',
    whatsapp: '+7 777 123 45 67',
}

export function ContactInfoBlock({
    heading = 'КОНТАКТЫ',
    subtitle = 'Мы всегда на связи и готовы ответить на ваши вопросы.',
    showMap = true,
    mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.772901235!2d76.9454!3d43.2389',
    showFromSettings = true,
    customContacts = defaultContacts,
}: ContactInfoBlockProps) {
    const contacts = customContacts || defaultContacts

    return (
        <section id="contacts" className="py-24 bg-white overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
                >
                    {showMap && (
                        <div className="h-[400px] lg:h-[600px] bg-slate-100 rounded-3xl overflow-hidden relative border border-slate-200">
                            <iframe
                                src={mapEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                title="Google Maps"
                            />
                        </div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:py-12"
                    >
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 uppercase">{heading}</h2>
                        {subtitle && <p className="text-lg text-slate-600 mb-12">{subtitle}</p>}

                        <div className="space-y-8">
                            {contacts.address && (
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Адрес</h4>
                                        <p className="text-slate-600">{contacts.address}</p>
                                    </div>
                                </div>
                            )}

                            {contacts.phone && (
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Телефон</h4>
                                        <p className="text-slate-600 font-medium text-xl">{contacts.phone}</p>
                                        {contacts.phoneSecondary && <p className="text-slate-600">{contacts.phoneSecondary}</p>}
                                    </div>
                                </div>
                            )}

                            {(contacts.email || contacts.emailSupport) && (
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Email</h4>
                                        {contacts.email && <p className="text-slate-600">{contacts.email}</p>}
                                        {contacts.emailSupport && <p className="text-slate-600">{contacts.emailSupport}</p>}
                                    </div>
                                </div>
                            )}

                            {contacts.workingHours && (
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Режим работы</h4>
                                        <p className="text-slate-600 whitespace-pre-line">{contacts.workingHours}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
