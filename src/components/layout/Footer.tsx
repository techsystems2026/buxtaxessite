import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <span className="text-2xl font-bold text-primary">BUX<span className="text-white">&</span>TAXES</span>
            <p className="text-sm leading-6 text-gray-300">
              Профессиональная бухгалтерия для ИП и ТОО в Казахстане.
              Ведём учёт, налоги, ЭСФ и СНТ без штрафов.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Услуги</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link href="/services/ip-bookkeeping" className="text-sm leading-6 text-gray-300 hover:text-white">Бухгалтерия ИП</Link></li>
                  <li><Link href="/services/too-vat" className="text-sm leading-6 text-gray-300 hover:text-white">ТОО с НДС</Link></li>
                  <li><Link href="/services/too-no-vat" className="text-sm leading-6 text-gray-300 hover:text-white">ТОО без НДС</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Компания</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link href="/about" className="text-sm leading-6 text-gray-300 hover:text-white">О компании</Link></li>
                  <li><Link href="/calculators" className="text-sm leading-6 text-gray-300 hover:text-white">Калькуляторы</Link></li>
                  <li><Link href="/blog" className="text-sm leading-6 text-gray-300 hover:text-white">Блог</Link></li>
                  <li><Link href="/tariffs" className="text-sm leading-6 text-gray-300 hover:text-white">Тарифы</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Контакты</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="text-sm leading-6 text-gray-300">Алматы, пр. Аль-Фараби 17</li>
                  <li className="text-sm leading-6 text-gray-300">+7 (777) 123-45-67</li>
                  <li className="text-sm leading-6 text-gray-300">info@buxtaxes.kz</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">&copy; {new Date().getFullYear()} BUX&TAXES. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
