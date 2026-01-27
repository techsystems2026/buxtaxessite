'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator as CalcIcon, Info, RefreshCw, Download, Mail, History, ArrowRight, Trash2 } from 'lucide-react'
import { useCalculationHistory, type HistoryItem } from '@/hooks/useCalculationHistory'
import { PrintResults } from '@/components/ui/PrintResults'
import { TAX_CONSTANTS, type TaxYear } from '@/lib/tax-constants'
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
  rate: number
}

export default function IPTaxCalculatorPage() {
  const [revenue, setRevenue] = useState<number>(0)
  const [year, setYear] = useState<TaxYear>(2025)
  const [results, setResults] = useState<TaxResults | null>(null)
  const [emailLoading, setEmailLoading] = useState(false)

  const { history, saveToHistory, clearHistory } = useCalculationHistory<number>('calc_history_ip')

  const sendEmail = async () => {
    if (!results) return
    setEmailLoading(true)
    try {
      const message = `Расчет налогов ИП (${year}):
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
        alert('Запрос на отправку результатов принят! Мы вышлем расчет на вашу почту.')
      }
    } catch {
      alert('Ошибка при отправке.')
    } finally {
      setEmailLoading(false)
    }
  }

  const calculate = () => {
    if (revenue < 0) return

    const constants = TAX_CONSTANTS[year]

    // Simplified Regime (Упрощенка)
    // Rate depends on year (3% or 4%)
    const rate = constants.SIMPLIFIED_TAX_RATE
    const totalTax = revenue * rate
    const ipn = totalTax / 2
    const socialTax = totalTax / 2

    // Fixed contributions for owner
    const mzp = constants.MZP
    const opv = mzp * 0.10 // 10% from MZP
    const so = mzp * 0.035 // 3.5% from MZP
    const vosms = 1.4 * mzp * 0.05 // 5% from 1.4 MZP

    const totalFixed = opv + so + vosms

    // In Simplify, Social Tax is reduced by SO
    let finalSocialTax = socialTax - so
    if (finalSocialTax < 0) finalSocialTax = 0

    const totalToPay = ipn + finalSocialTax + totalFixed
    const netIncome = revenue - totalToPay

    const newResults = {
      revenue,
      ipn,
      socialTax,
      finalSocialTax,
      opv,
      so,
      vosms,
      totalFixed,
      totalToPay,
      netIncome,
      rate
    }

    setResults(newResults)
    saveToHistory(`Доход ${revenue.toLocaleString()} ₸ (${year})`, revenue, newResults)
  }

  const loadFromHistory = (item: HistoryItem<number, TaxResults>) => {
    setRevenue(item.inputs)
    setResults(item.results)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="bg-slate-50 py-24 min-h-screen">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4 uppercase">КАЛЬКУЛЯТОР НАЛОГОВ ИП</h1>
          <p className="text-xl text-slate-600">Рассчитайте налоги ИП на упрощенном режиме за полугодие или месяц.</p>
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
                <Label>Год расчета</Label>
                <Select value={year.toString()} onValueChange={(v) => setYear(Number(v) as TaxYear)}>
                  <SelectTrigger className="h-14 text-lg rounded-xl">
                    <SelectValue placeholder="Выберите год" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025 год (3%)</SelectItem>
                    <SelectItem value="2026">2026 год (4%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                  <p className="font-bold mb-1">Режим: Упрощенка ({year})</p>
                  <p>Расчет: {year === 2025 ? '3%' : '4%'} с оборота. Минимальные отчисления за ИП включены.</p>
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
                    <div className="text-sm font-bold text-slate-300">Налоги ({(results.rate * 100).toFixed(0)}%)</div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">ИПН ({results.rate * 50}%)</span>
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

        {/* История расчетов */}
        {history.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <History className="w-6 h-6 text-slate-400" />
                История расчетов
              </h3>
              <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={clearHistory}>
                <Trash2 className="w-4 h-4 mr-2" />
                Очистить
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group cursor-pointer" onClick={() => loadFromHistory(item as HistoryItem<number, TaxResults>)}>
                  <div className="text-xs text-slate-400 mb-2">{new Date(item.date).toLocaleString()}</div>
                  <div className="font-bold text-lg mb-1">{Math.round((item.results as TaxResults).totalToPay).toLocaleString()} ₸</div>
                  <div className="text-sm text-slate-500 mb-4">{item.title}</div>
                  <div className="flex items-center text-primary text-sm font-bold group-hover:gap-2 transition-all">
                    Загрузить <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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

        {/* Print Layout */}
        {results && (
          <PrintResults
            title={`Расчет налогов ИП (Упрощенка ${year})`}
            items={[
              { label: 'Доход за период', value: results.revenue },
              { label: `ИПН (${results.rate * 50}%)`, value: results.ipn },
              { label: `Соц. налог (${results.rate * 50}% минус СО)`, value: results.finalSocialTax },
              { label: 'ОПВ (Пенсионные)', value: results.opv },
              { label: 'СО (Социальные)', value: results.so },
              { label: 'ВОСМС (Мед. страхование)', value: results.vosms },
              { label: 'ИТОГО К УПЛАТЕ', value: results.totalToPay, isTotal: true, highlight: true },
              { label: 'Чистая прибыль', value: results.netIncome, isTotal: true }
            ]}
          />
        )}
      </div>
    </main>
  )
}
