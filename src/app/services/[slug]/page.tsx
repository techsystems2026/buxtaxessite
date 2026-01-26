/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { CheckCircle2, HelpCircle } from 'lucide-react'
import { RichText } from '@/components/RichText'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'services',
      where: { slug: { equals: slug } },
    })

    if (!docs.length) return {}

    const service = docs[0]
    return {
      title: (service.seo as any)?.title || `${service.title} — BUX&TAXES`,
      description: (service.seo as any)?.description || service.shortDescription,
    }
  } catch {
    return {
      title: 'Услуги — BUX&TAXES'
    }
  }
}

export const dynamic = 'force-dynamic'

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  let service: any = null

  try {
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
      collection: 'services',
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    if (docs.length > 0) {
      service = docs[0]
    }
  } catch (error) {
    console.error('Error fetching service:', error)
  }

  if (!service) {
    notFound()
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    provider: {
      '@type': 'Organization',
      name: 'BUX&TAXES',
    },
    areaServed: 'KZ',
    offers: {
      '@type': 'Offer',
      price: (service.priceFrom as string)?.replace(/[^0-9]/g, ''),
      priceCurrency: 'KZT',
    },
  }

  const faqJsonLd = service.faq && (service.faq as any[]).length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (service.faq as any[]).map((item: { question?: string | null, answer?: string | null }) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {/* Hero Section */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link href="/#services" className="text-sm font-semibold text-primary mb-6 block">
            ← Все услуги
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-6">
              {service.h1 || service.title}
            </h1>
            <p className="text-xl leading-8 text-slate-600">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                {service.fullDescription ? (
                  <RichText content={service.fullDescription as any} />
                ) : (
                  <div className="text-slate-600">
                    <p>Профессиональное решение для вашего бизнеса. Мы обеспечиваем полное соответствие законодательству РК и берем на себя все сложности взаимодействия с налоговыми органами.</p>
                  </div>
                )}
              </div>

              {service.whatIsIncluded && (service.whatIsIncluded as any[]).length > 0 && (
                <div className="mt-16">
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">Что входит в услугу</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(service.whatIsIncluded as any[]).map((item: { item?: string | null }, index: number) => (
                      <li key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                        <span className="text-slate-700">{item.item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.reports && (service.reports as any[]).length > 0 && (
                <div className="mt-16">
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">Какие отчеты мы сдаем</h2>
                  <div className="flex flex-wrap gap-3">
                    {(service.reports as any[]).map((report: { report?: string | null }, index: number) => (
                      <span key={index} className="px-4 py-2 bg-primary/5 text-primary font-medium rounded-full border border-primary/10">
                        {report.report}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-8">
              <div className="bg-slate-900 rounded-3xl p-8 text-white sticky top-24">
                {service.whoLeadsAccount && (
                  <div className="mb-8 pb-8 border-b border-slate-800">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Кто ведет учет</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-xl font-bold">
                        {(service.whoLeadsAccount as string).charAt(0)}
                      </div>
                      <div className="font-bold text-lg">{service.whoLeadsAccount}</div>
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-4">Стоимость услуги</h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  {service.priceFrom}
                </div>
                <p className="text-slate-400 text-sm mb-8">Конечная стоимость зависит от объема операций и количества сотрудников.</p>
                <Button size="lg" className="w-full h-14 text-lg font-bold" asChild>
                  <Link href="/#contacts">Оставить заявку</Link>
                </Button>
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Консультация сегодня
                </div>
              </div>

              {service.responsibility && (
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Ответственность</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {service.responsibility}
                  </p>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {service.faq && (service.faq as any[]).length > 0 && (
        <section className="bg-slate-50 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 uppercase flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-primary" />
                Частые вопросы по услуге
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {(service.faq as any[]).map((item: { question?: string | null, answer?: string | null }, index: number) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-slate-200 rounded-2xl px-6 bg-white overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-bold hover:no-underline py-5">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 pb-6">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-primary rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8">Готовы доверить нам свою бухгалтерию?</h2>
              <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                Оставьте заявку, и наш эксперт свяжется с вами в течение 15 минут для обсуждения деталей вашего бизнеса.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" className="h-16 px-10 text-lg font-bold" asChild>
                  <Link href="/#contacts">Заказать консультацию</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-16 px-10 text-lg font-bold border-white/20 text-white hover:bg-white/10" asChild>
                  <a href="https://wa.me/77000000000" target="_blank" rel="noopener noreferrer">
                    Написать в WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>
    </main>
  )
}
