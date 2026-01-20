import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const services = [
  {
    title: 'Бухгалтерское сопровождение ИП',
    slug: 'ip-bookkeeping',
    description: 'Полное ведение бухгалтерии для индивидуальных предпринимателей.',
    price: 'от 15 000 ₸',
  },
  {
    title: 'Сопровождение ТОО с НДС',
    slug: 'too-vat',
    description: 'Комплексный учет для компаний на режиме НДС.',
    price: 'от 70 000 ₸',
  },
  {
    title: 'Сопровождение ТОО без НДС',
    slug: 'too-no-vat',
    description: 'Бухгалтерия для малого и среднего бизнеса.',
    price: 'от 40 000 ₸',
  },
  {
    title: 'ЭСФ и СНТ',
    slug: 'esf-snt',
    description: 'Работа с электронными счетами-фактурами и накладными.',
    price: 'от 20 000 ₸',
  }
]

export function ServicesOverview() {
  return (
    <section id="services" className="py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Наши услуги</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.slug} className="flex flex-col border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl leading-tight">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-primary font-bold text-lg mb-4">{service.price}</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/services/${service.slug}`}>Подробнее</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
