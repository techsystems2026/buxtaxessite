import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Briefcase } from 'lucide-react'

interface ServiceItem {
  title: string
  slug: string
  shortDescription: string
  priceFrom?: string | null
}

export async function ServicesOverview() {
  let docs = []
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'services',
      limit: 10,
    })
    docs = result.docs
  } catch (error) {
    console.error('Error fetching services:', error)
  }

  // Fallback if no services in DB yet
  const displayServices = (docs.length > 0 ? docs : [
    {
      title: 'Бухгалтерское сопровождение ИП',
      slug: 'ip-bookkeeping',
      shortDescription: 'Полное ведение бухгалтерии для индивидуальных предпринимателей на всех режимах.',
      priceFrom: 'от 15 000 ₸',
    },
    {
      title: 'Сопровождение ТОО с НДС',
      slug: 'too-vat',
      shortDescription: 'Комплексный учет, работа с импортом, экспортом и возмещением НДС.',
      priceFrom: 'от 70 000 ₸',
    },
    {
      title: 'Сопровождение ТОО без НДС',
      slug: 'too-no-vat',
      shortDescription: 'Профессиональный учет для малого и среднего бизнеса без НДС.',
      priceFrom: 'от 40 000 ₸',
    },
    {
      title: 'ЭСФ и СНТ',
      slug: 'esf-snt',
      shortDescription: 'Выписка электронных счетов-фактур и сопроводительных накладных без ошибок.',
      priceFrom: 'от 20 000 ₸',
    },
    {
      title: 'Восстановление учета',
      slug: 'recovery',
      shortDescription: 'Приведем вашу бухгалтерию в порядок и исправим ошибки прошлых периодов.',
      priceFrom: 'по запросу',
    },
    {
      title: 'Налоговый аудит',
      slug: 'audit',
      shortDescription: 'Проверка налоговых рисков и профессиональные консультации по оптимизации.',
      priceFrom: 'от 30 000 ₸',
    }
  ]) as unknown as ServiceItem[]

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl uppercase">НАШИ УСЛУГИ</h2>
          <p className="mt-4 text-lg text-slate-600">Мы предлагаем полный спектр бухгалтерских услуг для вашего успеха</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayServices.map((service) => (
            <Card key={service.slug} className="flex flex-col border-none shadow-lg hover:shadow-xl transition-shadow rounded-3xl overflow-hidden">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl leading-tight font-bold">{service.title}</CardTitle>
                <CardDescription className="text-slate-600 mt-2 line-clamp-3">{service.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-end pt-4">
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-primary font-bold text-xl">{service.priceFrom}</p>
                  <Button variant="ghost" className="text-primary font-bold hover:text-primary hover:bg-primary/5" asChild>
                    <Link href={`/services/${service.slug}`}>Подробнее →</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
