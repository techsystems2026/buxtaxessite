'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calculator as CalcIcon, Info, RefreshCw, Download, Mail } from 'lucide-react'
import Link from 'next/link'

interface TaxResults {
  revenue: number
  ipn: number
  socialTax: number
  finalSocialTax: number
  opv: number
  so: number
  vosms: number
  totalFixed: number
  totalToPay: number
  netIncome: number
}

export default function IPTaxCalculatorPage() {
  const [revenue, setRevenue] = useState<number>(0)
  const [results, setResults] = useState<TaxResults | null>(null)
  const [emailLoading, setEmailLoading] = useState(false)

  const sendEmail = async () => {
    if (!results) return
    setEmailLoading(true)
    try {
      const message = `Расчет налогов ИП (2025):
Доход: ${revenue} ₸
К уплате всего: ${results.totalToPay} ₸
ИПН: ${results.ipn} ₸
Соц. налог: ${results.finalSocialTax} ₸
Взносы за ИП: ${results.totalFixed} ₸`

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Calculator User',
          phone: 'requested via calc',
          message: message,
          source: 'IP Tax Calculator'
        }),
      })

      if (response.ok) {
        alert('Запрос на отправку результатов принят! Мы вышлем расчет на вашу почту (укажите её в форме контактов ниже для связи).')
      }
    } catch {
      alert('Ошибка при отправке.')
    } finally {
      setEmailLoading(false)
    }
  }

  const calculate = () => {
    if (revenue < 0) return

    // Standard Simplified Regime (Упрощенка)
    // 3% total tax
    const totalTax = revenue * 0.03
    const ipn = totalTax / 2
    const socialTax = totalTax / 2

    // Fixed contributions for owner (2025 constants)
    const mzp = 85000
    const opv = mzp * 0.10 // 8500
    const so = mzp * 0.035 // 2975
    const vosms = 5950 // Still fixed for 2025 unless changed

    const totalFixed = opv + so + vosms

    // In Simplify, Social Tax is reduced by SO
    let finalSocialTax = socialTax - so
    if (finalSocialTax < 0) finalSocialTax = 0

    const totalToPay = ipn + finalSocialTax + totalFixed
    const netIncome = revenue - totalToPay

    setResults({
      revenue,
      ipn,
      socialTax,
      finalSocialTax,
      opv,
      so,
      vosms,
      totalFixed,
      totalToPay,
      netIncome
    })
  }

  return (
    <main className="bg-slate-50 py-24 min-h-screen">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4 uppercase">КАЛЬКУЛЯТОР НАЛОГОВ ИП</h1>
          <p className="text-xl text-slate-600">Рассчитайте налоги ИП на упрощенном режиме (3%) за полугодие или месяц.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="rounded-[2rem] border-none shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalcIcon className="text-primary" />
                Параметры
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="revenue">Ваш доход (выручка) за период</Label>
                <div className="relative">
                  <Input
                    id="revenue"
                    type="number"
                    placeholder="Например: 1000000"
                    className="h-14 text-lg pl-4 pr-12 rounded-xl"
                    value={revenue || ''}
                    onChange={(e) => setRevenue(Number(e.target.value))}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₸</span>
                </div>
              </div>
              <Button onClick={calculate} className="w-full h-14 text-lg font-bold rounded-xl">
                Рассчитать налоги
              </Button>
              <div className="p-4 bg-primary/5 rounded-xl flex gap-3 text-sm text-slate-600">
                <Info className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-bold mb-1">Режим: Упрощенка</p>
                  <p>Расчет включает 3% налога и минимальные обязательные отчисления за самого ИП.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-xl bg-slate-900 text-white">
            <CardHeader>
              <CardTitle>Итого к уплате</CardTitle>
            </CardHeader>
            <CardContent>
              {!results ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-700 rounded-3xl">
                  <RefreshCw className="w-12 h-12 mb-4 animate-spin-slow" />
                  <p>Введите доход для расчета</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <div className="text-slate-400 text-sm mb-1">Общая сумма налогов и отчислений</div>
                    <div className="text-4xl font-bold text-primary">{Math.round(results.totalToPay).toLocaleString()} ₸</div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-slate-800">
                    <div className="text-sm font-bold text-slate-300">Налоги (3%)</div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">ИПН (1.5%)</span>
                      <span className="font-medium">{Math.round(results.ipn).toLocaleString()} ₸</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Соц. налог (с учетом вычета)</span>
                      <span className="font-medium">{Math.round(results.finalSocialTax).toLocaleString()} ₸</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-slate-800">
                    <div className="text-sm font-bold text-slate-300">Обязательные взносы (за ИП)</div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">ОПВ (Пенсионные)</span>
                      <span className="font-medium">{results.opv.toLocaleString()} ₸</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">СО (Социальные)</span>
                      <span className="font-medium">{results.so.toLocaleString()} ₸</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">ВОСМС (Мед. страхование)</span>
                      <span className="font-medium">{results.vosms.toLocaleString()} ₸</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-300">Остается чистой прибыли</span>
                    <span className="text-xl font-bold text-green-400">{Math.round(results.netIncome).toLocaleString()} ₸</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {results && (
          <div className="mt-12 bg-white rounded-[2rem] p-8 lg:p-12 shadow-lg border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Хотите платить меньше налогов легально?</h3>
              <p className="text-slate-600">Наши эксперты помогут выбрать оптимальный налоговый режим и настроить учет так, чтобы вы не переплачивали ни одного тенге.</p>
            </div>
            <div className="flex flex-wrap gap-4 w-full lg:w-auto">
              <Button size="lg" className="h-14 px-8 font-bold flex-1 lg:flex-none print:hidden" asChild>
                <Link href="/#contacts">Получить консультацию</Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 font-bold flex-1 lg:flex-none border-slate-200 print:hidden" onClick={() => window.print()}>
                <Download className="w-5 h-5 mr-2" />
                Скачать PDF
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 font-bold flex-1 lg:flex-none border-slate-200 print:hidden" onClick={sendEmail} disabled={emailLoading}>
                <Mail className="w-5 h-5 mr-2" />
                {emailLoading ? 'Отправка...' : 'На Email'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
