import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Calculator, Wallet, Users, ArrowRight } from 'lucide-react'

export default function CalculatorsPage() {
  const calcs = [
    {
      title: 'Калькулятор налогов ИП',
      description: 'Расчет налогов и отчислений для индивидуальных предпринимателей на упрощенном режиме.',
      href: '/calculators/tax-ip',
      icon: Wallet,
      color: 'bg-blue-500'
    },
    {
      title: 'Калькулятор зарплаты',
      description: 'Детальный расчет налогов и взносов с заработной платы сотрудников (Gross/Net).',
      href: '/calculators/salary',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Калькулятор налогов ТОО',
      description: 'Предварительный расчет налоговой нагрузки для товариществ (Упрощенка / ОУР).',
      href: '/calculators/tax-too',
      icon: Calculator,
      color: 'bg-purple-500',
      disabled: false
    }
  ]

  return (
    <main className="bg-slate-50 py-24 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4 uppercase">ОНЛАЙН КАЛЬКУЛЯТОРЫ</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Бесплатные инструменты для быстрого расчета налогов и взносов согласно законодательству РК.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calcs.map((calc, index) => (
            <Card key={index} className="flex flex-col border-none shadow-lg hover:shadow-xl transition-all rounded-[2rem] overflow-hidden bg-white">
              <CardHeader className="pb-4">
                <div className={`w-14 h-14 ${calc.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                  <calc.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold">{calc.title}</CardTitle>
                <CardDescription className="text-slate-600 text-base mt-2">
                  {calc.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-end pt-4">
                <Button className="w-full h-12 font-bold rounded-xl group" asChild disabled={calc.disabled}>
                  <Link href={calc.href}>
                    {calc.disabled ? 'Скоро появится' : 'Перейти к расчету'}
                    {!calc.disabled && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 bg-primary rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Нужен точный налоговый расчет?</h2>
              <p className="text-blue-100 text-lg mb-8">
                Наши калькуляторы дают предварительную оценку. Для точного планирования налогов и оптимизации расходов запишитесь на консультацию к нашему главному бухгалтеру.
              </p>
              <Button size="lg" variant="secondary" className="h-14 px-8 font-bold" asChild>
                <Link href="/#contacts">Записаться на консультацию</Link>
              </Button>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary font-bold">BT</div>
                  <div>
                    <div className="font-bold text-lg">Bux & Taxes Expert</div>
                    <div className="text-blue-200 text-sm">Гарантия точности</div>
                  </div>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    <span>Учет всех льгот и вычетов</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    <span>Анализ рисков по СУР</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    <span>Оптимизация налоговой базы</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
      </div>
    </main>
  )
}
