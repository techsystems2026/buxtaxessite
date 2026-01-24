import { ShieldCheck, Award, Users2, HeartHandshake, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
  const values = [
    {
      title: 'Ответственность',
      description: 'Мы несем полную материальную ответственность за свою работу. Все риски застрахованы.',
      icon: ShieldCheck
    },
    {
      title: 'Экспертность',
      description: 'Наши бухгалтеры постоянно проходят курсы повышения квалификации и следят за изменениями.',
      icon: Award
    },
    {
      title: 'Конфиденциальность',
      description: 'Гарантируем сохранность вашей коммерческой тайны и персональных данных.',
      icon: Users2
    },
    {
      title: 'Партнерство',
      description: 'Мы не просто исполнители, а ваши надежные партнеры, заинтересованные в росте вашего бизнеса.',
      icon: HeartHandshake
    }
  ]

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-slate-900 py-24 lg:py-32 relative overflow-hidden text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-8 uppercase">
              ЭКСПЕРТЫ В МИРЕ <span className="text-primary">ФИНАНСОВ</span> И НАЛОГОВ
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-10">
              BUX&TAXES — это команда профессиональных бухгалтеров и налоговых консультантов, которые помогают бизнесу в Казахстане расти, забыв о штрафах и проверках.
            </p>
            <div className="flex gap-4">
               <Button size="lg" className="h-14 px-8 font-bold" asChild>
                 <Link href="/#contacts">Связаться с нами</Link>
               </Button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-3xl rounded-full" />
      </section>

      {/* Mission / Principles */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 uppercase">НАША МИССИЯ</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Мы верим, что предприниматели должны заниматься развитием своего дела, а не заполнением деклараций и расчетом налогов. Наша задача — сделать бухгалтерию прозрачной, понятной и безопасной.
              </p>
              <div className="space-y-4">
                {[
                  'Работаем на рынке более 10 лет',
                  'Обслуживаем более 200 постоянных клиентов',
                  'Сдали более 15 000 налоговых отчетов',
                  'В штате только сертифицированные бухгалтеры'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-8 rounded-3xl text-center">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-sm text-slate-500">Лет опыта</div>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl text-center">
                <div className="text-4xl font-bold text-primary mb-2">200+</div>
                <div className="text-sm text-slate-500">Клиентов</div>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl text-center">
                <div className="text-4xl font-bold text-primary mb-2">0</div>
                <div className="text-sm text-slate-500">Штрафов у клиентов</div>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-slate-500">Поддержка</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 uppercase mb-4">НАШИ ЦЕННОСТИ</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">То, на чем строится наша работа и доверие наших клиентов.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
           <h2 className="text-3xl lg:text-5xl font-bold mb-8">Давайте работать вместе!</h2>
           <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
             Доверьте свою бухгалтерию профессионалам и сосредоточьтесь на главном — росте вашего бизнеса.
           </p>
           <Button size="lg" className="h-16 px-12 text-lg font-bold rounded-2xl" asChild>
             <Link href="/#contacts">Стать клиентом</Link>
           </Button>
        </div>
      </section>
    </main>
  )
}
