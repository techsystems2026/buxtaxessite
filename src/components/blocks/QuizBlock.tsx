'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

interface QuizBlockProps {
    heading?: string
    subtitle?: string
    steps?: Array<{
        id?: string | null
        question?: string | null
        options?: Array<{ label?: string | null }>
    }>
    completionHeading?: string
    completionMessage?: string
}

export function QuizBlock({
    heading = 'ОТВЕТЬТЕ НА 4 ВОПРОСА',
    subtitle = 'Получите расчет стоимости обслуживания и бесплатную консультацию',
    steps = [
        { id: 'type', question: 'Выберите ваш вид деятельности', options: [{ label: 'Торговля' }, { label: 'Услуги' }, { label: 'Производство' }] },
        { id: 'regime', question: 'Какая у вас система налогообложения?', options: [{ label: 'Упрощенная' }, { label: 'Общеустановленная' }] },
        { id: 'turnover', question: 'Примерный оборот в месяц', options: [{ label: 'До 1 млн' }, { label: '1-10 млн' }, { label: 'Более 10 млн' }] },
        { id: 'staff', question: 'Количество сотрудников', options: [{ label: 'Нет' }, { label: '1-5' }, { label: 'Более 5' }] },
    ],
    completionHeading = 'ОТЛИЧНО! МЫ ПОЧТИ ЗАКОНЧИЛИ',
    completionMessage = 'Оставьте ваши контакты, и мы подготовим для вас индивидуальное предложение.',
}: QuizBlockProps) {
    return (
        <section className="py-24 bg-slate-900 text-white overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 uppercase">{heading}</h2>
                    {subtitle && <p className="text-slate-400">{subtitle}</p>}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700"
                >
                    <div className="text-center">
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle2 className="w-12 h-12 text-primary" />
                        </div>
                        <h3 className="text-3xl font-bold mb-6">{completionHeading}</h3>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto">{completionMessage}</p>
                        <div className="bg-slate-700/50 rounded-2xl p-8">
                            <p className="text-sm text-slate-400 mb-4">Оставьте ваши контакты:</p>
                            <p className="text-2xl font-bold text-white">+7 (777) 123-45-67</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
