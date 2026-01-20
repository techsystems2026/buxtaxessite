import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative bg-white py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
              BUX&TAXES — бухгалтерия для <span className="text-primary">ИП и ТОО</span> в Казахстане
            </h1>
            <p className="text-lg leading-8 text-muted-foreground mb-8">
              Ведём учёт, налоги, ЭСФ и СНТ. Берём на себя отчёты и общение с налоговой. Работаем под ключ и несем ответственность по договору.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/contacts">Рассчитать стоимость</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50" asChild>
                <a href="https://wa.me/77000000000" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
          <div className="mt-16 lg:mt-0 relative">
            <div className="aspect-[4/3] rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden shadow-xl">
               <div className="p-8 text-center">
                 <div className="text-primary text-6xl font-bold mb-4">B&T</div>
                 <div className="text-foreground text-xl font-semibold">Ваш надежный партнер в налогах</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
