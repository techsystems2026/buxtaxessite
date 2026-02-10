'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'

interface FAQBlockProps {
    heading?: string
    subtitle?: string
    source?: string
    limit?: number
    customFaqs?: Array<{
        question?: string | null
        answer?: string | null
    }>
    showContactCard?: boolean
}

const defaultFaqs = [
    { question: 'Несете ли вы материальную ответственность?', answer: 'Да, мы несем полную финансовую ответственность за правильность ведения учета и своевременную сдачу отчетности.' },
    { question: 'Как быстро вы отвечаете на запросы клиентов?', answer: 'В рабочее время среднее время ответа составляет не более 15-30 минут.' },
    { question: 'Работаете ли вы с электронным документооборотом?', answer: 'Безусловно. Мы активно используем ИС ЭСФ, системы ЭДО и помогаем настроить безбумажное взаимодействие.' },
    { question: 'Можете ли вы восстановить учет?', answer: 'Да, мы специализируемся на восстановлении бухгалтерского учета любой сложности.' },
    { question: 'Как происходит передача документов?', answer: 'Большинство документов передается в электронном виде через WhatsApp или Telegram.' },
]

export function FAQBlock({
    heading = 'ОТВЕТЫ НА ВОПРОСЫ',
    subtitle,
    source = 'collection',
    limit = 5,
    customFaqs,
    showContactCard = true,
}: FAQBlockProps) {
    const faqs = source === 'custom' && customFaqs?.length ? customFaqs : defaultFaqs.slice(0, limit)

    return (
        <section id="faq" className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 uppercase">{heading}</h2>
                        {subtitle && <p className="text-lg text-slate-600 mb-8">{subtitle}</p>}
                        {showContactCard && (
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                                <h4 className="font-bold text-xl mb-2">Нужна консультация?</h4>
                                <p className="text-slate-600 mb-6">Наши эксперты готовы детально разобрать вашу ситуацию.</p>
                                <Button className="bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-primary/90 transition-all">
                                    Задать свой вопрос
                                </Button>
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border border-slate-200 rounded-2xl px-6 bg-white overflow-hidden shadow-sm transition-all data-[state=open]:border-primary/30 data-[state=open]:shadow-md"
                                >
                                    <AccordionTrigger className="text-left font-bold hover:no-underline py-5 text-slate-900">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-600 pb-6 leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
