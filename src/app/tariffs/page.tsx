import { getPayload } from 'payload'
import config from '@/payload.config'
import { Check, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function TariffsPage() {
  const payload = await getPayload({ config })
  const { docs: tariffs } = await payload.find({
    collection: 'tariffs',
    sort: 'price',
  })

  const categories = [
    { id: 'IP', name: 'ИП' },
    { id: 'TOO_NO_VAT', name: 'ТОО без НДС' },
    { id: 'TOO_VAT', name: 'ТОО с НДС' },
  ]

  return (
    <main className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">ТАРИФЫ НА ОБСЛУЖИВАНИЕ</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Прозрачное ценообразование без скрытых платежей. Выберите подходящий пакет для вашего бизнеса.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const catTariffs = tariffs.filter(t => t.category === cat.id)
            return (
              <div key={cat.id} className="flex flex-col">
                <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center">{cat.name}</h2>
                <div className="space-y-6 flex-grow">
                  {catTariffs.map((tariff) => (
                    <div key={tariff.id} className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 flex flex-col h-full hover:border-primary/50 transition-colors">
                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{tariff.name}</h3>
                        <div className="text-3xl font-bold text-primary">{tariff.price}</div>
                        {tariff.format && <div className="text-sm text-slate-500 mt-1">{tariff.format}</div>}
                      </div>

                      <ul className="space-y-4 mb-8 flex-grow">
                        {tariff.features?.map((f: { feature?: string | null }, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span>{f.feature}</span>
                          </li>
                        ))}
                      </ul>

                      {tariff.responsibility && (
                        <div className="mb-8 p-4 bg-slate-50 rounded-2xl text-xs text-slate-500 flex gap-2">
                          <Info className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{tariff.responsibility}</span>
                        </div>
                      )}

                      <Button className="w-full h-12 font-bold" asChild>
                        <Link href={`/#contacts?tariff=${tariff.name}`}>Выбрать тариф</Link>
                      </Button>
                    </div>
                  ))}
                  {catTariffs.length === 0 && (
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-dashed border-slate-300 text-center text-slate-400">
                      Индивидуальный расчет
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-20 bg-slate-900 rounded-[3rem] p-12 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Не нашли подходящий тариф?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Свяжитесь с нами, и мы подготовим индивидуальное предложение, исходя из специфики вашего бизнеса и объема документов.
          </p>
          <Button variant="secondary" size="lg" className="h-14 px-8 font-bold" asChild>
            <Link href="/#contacts">Получить консультацию</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
