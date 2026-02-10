'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ClientsBlockProps {
    heading?: string
    subtitle?: string
    showFromCollection?: boolean
    clientsCount?: number
    fallbackLogos?: Array<{
        name?: string | null
        logo?: string | null
    }>
}

const defaultClients = [
    { name: 'Client 1', logo: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=200&h=100' },
    { name: 'Client 2', logo: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=200&h=100' },
    { name: 'Client 3', logo: 'https://images.unsplash.com/photo-1614850523598-7253507c31d6?q=80&w=200&h=100' },
    { name: 'Client 4', logo: 'https://images.unsplash.com/photo-1614850523000-022e0323971c?q=80&w=200&h=100' },
    { name: 'Client 5', logo: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=200&h=100' },
    { name: 'Client 6', logo: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=200&h=100' },
]

export function ClientsBlock({
    heading = 'НАШИ КЛИЕНТЫ',
    subtitle = 'Нам доверяют более 100 компаний по всему Казахстану',
    showFromCollection = true,
    clientsCount = 6,
    fallbackLogos = defaultClients,
}: ClientsBlockProps) {
    const clients = fallbackLogos.slice(0, clientsCount)

    return (
        <section className="py-24 bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 uppercase">{heading}</h2>
                    {subtitle && <p className="text-slate-600">{subtitle}</p>}
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {clients.map((client, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-center p-8 bg-white rounded-2xl border border-slate-100 grayscale hover:grayscale-0 transition-all duration-300 shadow-sm"
                        >
                            {client.logo && (
                                <Image
                                    src={client.logo}
                                    alt={client.name || 'Client logo'}
                                    width={200}
                                    height={100}
                                    className="max-h-12 w-auto object-contain"
                                />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
