'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

interface NewsItem {
    title?: string | null
    excerpt?: string | null
    publishedAt?: string | null
    slug?: string | null
}

interface LatestNewsBlockProps {
    heading?: string
    subtitle?: string
    showCount?: number
    showViewAllLink?: boolean
}

const defaultNews = [
    { title: 'Изменения в налоговом кодексе 2025', excerpt: 'Разбираем основные поправки, которые коснутся малого и среднего бизнеса.', publishedAt: '2024-12-01', slug: 'tax-changes-2025' },
    { title: 'Как ИП сдать 910 форму без штрафов', excerpt: 'Пошаговая инструкция по заполнению упрощенной декларации.', publishedAt: '2024-11-15', slug: 'form-910-guide' },
    { title: 'Штрафы за просрочку отчетности в РК', excerpt: 'Какие санкции предусмотрены за несвоевременное предоставление отчетности.', publishedAt: '2024-10-20', slug: 'tax-penalties' },
]

export function LatestNewsBlock({
    heading = 'БАЗА ЗНАНИЙ',
    subtitle,
    showCount = 3,
    showViewAllLink = true,
}: LatestNewsBlockProps) {
    const displayNews = defaultNews.slice(0, showCount)

    return (
        <section id="blog" className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
                >
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl uppercase">{heading}</h2>
                        {subtitle && <p className="mt-4 text-lg text-slate-600 max-w-2xl">{subtitle}</p>}
                    </div>
                    {showViewAllLink && (
                        <Link href="/blog" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
                            Все статьи <ArrowRight className="w-5 h-5" />
                        </Link>
                    )}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayNews.map((item, index) => (
                        <motion.article
                            key={item.slug || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-start bg-slate-50 rounded-[2rem] overflow-hidden hover:shadow-xl transition-all border border-slate-100 group"
                        >
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                                    <Calendar className="w-4 h-4" />
                                    {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('ru-RU') : ''}
                                </div>
                                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-slate-600 text-sm mb-8 line-clamp-3 leading-relaxed">
                                    {item.excerpt}
                                </p>
                                <Link href={`/blog/${item.slug}`} className="mt-auto text-primary font-bold text-sm flex items-center gap-2">
                                    Читать полностью <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
