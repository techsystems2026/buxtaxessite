import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Calculator, Briefcase, FileText, ClipboardList, ShieldCheck, UserCheck } from 'lucide-react'

const services = [
  {
    title: 'Бухгалтерское сопровождение ИП',
    slug: 'ip-bookkeeping',
    description: 'Полное ведение бухгалтерии для индивидуальных предпринимателей на всех режимах.',
    price: 'от 15 000 ₸',
    icon: UserCheck
  },
  {
    title: 'Сопровождение ТОО с НДС',
    slug: 'too-vat',
    description: 'Комплексный учет, работа с импортом, экспортом и возмещением НДС.',
    price: 'от 70 000 ₸',
    icon: Briefcase
  },
  {
    title: 'Сопровождение ТОО без НДС',
    slug: 'too-no-vat',
    description: 'Профессиональный учет для малого и среднего бизнеса без НДС.',
    price: 'от 40 000 ₸',
    icon: Calculator
  },
  {
    title: 'ЭСФ и СНТ',
    slug: 'esf-snt',
    description: 'Выписка электронных счетов-фактур и сопроводительных накладных без ошибок.',
    price: 'от 20 000 ₸',
    icon: FileText
  },
  {
    title: 'Восстановление учета',
    slug: 'recovery',
    description: 'Приведем вашу бухгалтерию в порядок и исправим ошибки прошлых периодов.',
    price: 'по запросу',
    icon: ClipboardList
  },
  {
    title: 'Налоговый аудит и консалтинг',
    slug: 'audit',
    description: 'Проверка налоговых рисков и профессиональные консультации по оптимизации.',
    price: 'от 30 000 ₸',
    icon: ShieldCheck
  }
]

export function ServicesOverview() {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl uppercase">НАШИ УСЛУГИ</h2>
          <p className="mt-4 text-lg text-slate-600">Мы предлагаем полный спектр бухгалтерских услуг для вашего успеха</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.slug} className="flex flex-col border-none shadow-lg hover:shadow-xl transition-shadow rounded-3xl overflow-hidden">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  <service.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl leading-tight font-bold">{service.title}</CardTitle>
                <CardDescription className="text-slate-600 mt-2">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-end pt-4">
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-primary font-bold text-xl">{service.price}</p>
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
