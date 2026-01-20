import { Button } from '@/components/ui/button'
import { MessageCircle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { label: 'Лет на рынке', value: '10+' },
  { label: 'Удаленное обслуживание', value: '90%' },
  { label: 'Сданных отчетов', value: '5000+' },
  { label: 'Профессиональных бухгалтеров', value: '15+' },
]

const bulletPoints = [
  'Ведение налогового и бухгалтерского учета',
  'Сдача всех видов отчетности (910, 200, 300, 100 и др.)',
  'Регистрация и ликвидация ИП/ТОО',
  'Консультации по оптимизации налогов',
]

export function Hero() {
  return (
    <section className="relative bg-slate-50 py-20 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6 uppercase">
              ВСЕ БУХГАЛТЕРСКИЕ <span className="text-primary">СЕРВИСЫ</span> В ОДНОМ МЕСТЕ
            </h1>
            <p className="text-xl leading-8 text-slate-600 mb-8 max-w-xl">
              Профессиональное сопровождение вашего бизнеса в Казахстане. Мы берем на себя все заботы о бухгалтерии, чтобы вы могли сосредоточиться на росте.
            </p>

            <ul className="space-y-4 mb-10">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-14 px-8 text-lg font-bold" asChild>
                <Link href="#contacts">Заказать консультацию</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-slate-200 bg-white hover:bg-slate-50" asChild>
                <a href="https://wa.me/77000000000" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-6 w-6 text-green-500" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-20 lg:mt-0">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-3xl ${
                    index === 0 ? 'bg-primary text-white' : 'bg-white border border-slate-100 shadow-sm'
                  }`}
                >
                  <div className={`text-4xl font-bold mb-2 ${index === 0 ? 'text-white' : 'text-primary'}`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm font-medium leading-tight ${index === 0 ? 'text-white/80' : 'text-slate-500'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-8 bg-slate-900 rounded-3xl text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-xl font-bold">
                  B
                </div>
                <div>
                  <div className="font-bold text-lg">Bux & Taxes</div>
                  <div className="text-slate-400 text-sm">Ваш надежный партнер</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
