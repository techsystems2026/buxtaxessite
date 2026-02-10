'use client'

import { motion } from 'framer-motion'
import { RichText } from '@/components/RichText'

interface RichContentBlockProps {
    content?: { root: { children: Array<{ type: string;[key: string]: unknown }> } } | null
    backgroundColor?: string
}

export function RichContentBlock({
    content,
    backgroundColor = 'white',
}: RichContentBlockProps) {
    const bgColors: Record<string, string> = {
        white: 'bg-white',
        gray: 'bg-slate-50',
        dark: 'bg-slate-900 text-white',
    }

    return (
        <section className={`py-24 ${bgColors[backgroundColor] || bgColors.white}`}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="prose prose-lg max-w-none"
                >
                    {content ? (
                        <RichText content={content} />
                    ) : (
                        <div className="text-slate-600">
                            <p>Контент будет отображаться здесь...</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    )
}
