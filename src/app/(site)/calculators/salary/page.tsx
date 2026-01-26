'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calculator as CalcIcon, Download, RefreshCw, Info, Mail, Settings2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { TAX_CONSTANTS, type TaxYear } from '@/lib/tax-constants'
import { PrintResults } from '@/components/ui/PrintResults'
import { calculateSalary, type SalaryInputs, type SalaryResults, type CalculationMethod, type EmployeeCategory } from '@/lib/salary-calculator'
import Link from 'next/link'

export default function SalaryCalculatorPage() {
  const [amount, setAmount] = useState<number>(0)
  const [year, setYear] = useState<TaxYear>(2025)
  const [method, setMethod] = useState<CalculationMethod>('gross')
  const [category, setCategory] = useState<EmployeeCategory>('employee')
  const [hasDeduction, setHasDeduction] = useState<boolean>(true)
  const [isResident, setIsResident] = useState<boolean>(true)

  const [results, setResults] = useState<SalaryResults | null>(null)
  const [emailLoading, setEmailLoading] = useState(false)

  // Auto-calculate on changes if amount is present
  useEffect(() => {
    if (amount > 0) {
      handleCalculate()
    }
  }, [year, method, category, hasDeduction, isResident])

  const handleCalculate = () => {
    if (amount < 0) return

    const inputs: SalaryInputs = {
      amount,
      year,
      method,
      category,
      hasDeduction,
      isResident
    }

    const res = calculateSalary(inputs)
    setResults(res)
  }

  const sendEmail = async () => {
    if (!results) return
    setEmailLoading(true)
    try {
      const message = `Расчет зарплаты (${year}, ${method === 'gross' ? 'От оклада' : 'На руки'}):
Ввод: ${amount} ₸
Оклад (Gross): ${results.gross} ₸
На руки (Net): ${results.net} ₸
Расходы работодателя: ${results.totalEmployerCost} ₸`

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Calculator User',
          phone: 'requested via calc',
          message: message,
          source: 'Salary Calculator'
        }),
      })

      if (response.ok) {
        alert('Запрос на отправку результатов принят!')
      }
    } catch {
      alert('Ошибка при отправке.')
    } finally {
      setEmailLoading(false)
    }
  }

  return (
    <main className="bg-slate-50 py-24 min-h-screen">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4 uppercase">КАЛЬКУЛЯТОР ЗАРПЛАТЫ</h1>
          <p className="text-xl text-slate-600">Универсальный расчет налогов и отчислений с учетом всех льгот и изменений 2026 года.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="rounded-[2rem] border-none shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="text-primary" />
                Параметры расчета
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Top Controls: Year & Method */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Год</Label>
                  <Select value={year.toString()} onValueChange={(v) => setYear(Number(v) as TaxYear)}>
                    <SelectTrigger className="h-10 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Метод</Label>
                  <Tabs value={method} onValueChange={(v) => setMethod(v as CalculationMethod)} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 h-10">
                      <TabsTrigger value="gross">От оклада</TabsTrigger>
                      <TabsTrigger value="net">На руки</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="amount">{method === 'gross' ? 'Оклад (Gross)' : 'Сумма на руки (Net)'}</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="250000"
                    className="h-14 text-lg pl-4 pr-12 rounded-xl border-primary/20 focus-visible:ring-primary"
                    value={amount || ''}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₸</span>
                </div>
              </div>

              {/* Category & Deduction */}
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Категория сотрудника</Label>
                  <Select value={category} onValueChange={(v) => setCategory(v as EmployeeCategory)}>
                    <SelectTrigger className="h-12 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Штатный сотрудник</SelectItem>
                      <SelectItem value="pensioner">Пенсионер по возрасту</SelectItem>
                      <SelectItem value="disabled">Лицо с инвалидностью (1, 2 гр)</SelectItem>
                      <SelectItem value="gph">Договор ГПХ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {category !== 'gph' && (
                  <div className="flex items-center space-x-2 border p-3 rounded-lg bg-slate-50/50">
                    <Checkbox id="deduction" checked={hasDeduction} onCheckedChange={(c) => setHasDeduction(!!c)} />
                    <label
                      htmlFor="deduction"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Применять вычет ИПН ({TAX_CONSTANTS[year].IPN_DEDUCTION_MRP} МРП)
                    </label>
                  </div>
                )}

                {category === 'gph' && (
                  <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                    По ГПХ Заказчик не платит Соц. налог, СО и ОПВР. Удерживаются ОПВ, ВОСМС и ИПН.
                  </div>
                )}
              </div>

              <Button onClick={handleCalculate} className="w-full h-14 text-lg font-bold rounded-xl mt-4">
                Рассчитать
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-xl bg-slate-900 text-white">
            <CardHeader>
              <CardTitle>Результаты</CardTitle>
            </CardHeader>
            <CardContent>
              {!results ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-700 rounded-3xl">
                  <RefreshCw className="w-12 h-12 mb-4 animate-spin-slow" />
                  <p>Введите данные для расчета</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <div className="text-slate-400 text-sm mb-1">
                      {method === 'gross' ? 'Чистая зарплата (на руки)' : 'Начисленный оклад (Gross)'}
                    </div>
                    <div className="text-4xl font-bold text-primary">
                      {method === 'gross' ? results.net.toLocaleString() : results.gross.toLocaleString()} ₸
                    </div>
                    {method === 'net' && (
                      <div className="text-sm text-slate-400 mt-1">
                        Чтобы получить {results.net.toLocaleString()} ₸ на руки
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-800">
                    <div className="text-sm font-bold text-slate-300 mb-2">Удержано с сотрудника</div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">ОПВ (Пенсионные)</span>
                      <span className="font-medium">{Math.round(results.opv).toLocaleString()} ₸</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">ВОСМС (Мед. страх.)</span>
                      <span className="font-medium">{Math.round(results.vosms).toLocaleString()} ₸</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">ИПН (Подоходный)</span>
                      <span className="font-medium">{Math.round(results.ipn).toLocaleString()} ₸</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-800">
                    <div className="text-sm font-bold text-slate-300 mb-2">Налоги работодателя (сверх оклада)</div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Соц. отчисления</span>
                      <span className="font-medium">{Math.round(results.so).toLocaleString()} ₸</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">ОСМС</span>
                      <span className="font-medium">{Math.round(results.osms).toLocaleString()} ₸</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">ОПВР</span>
                      <span className="font-medium">{Math.round(results.opvm).toLocaleString()} ₸</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Соц. налог</span>
                      <span className="font-medium">{Math.round(results.sn).toLocaleString()} ₸</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 text-primary border-t border-slate-800 mt-2">
                      <span>Итого общие затраты</span>
                      <span>{Math.round(results.totalEmployerCost).toLocaleString()} ₸</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {results && (
          <div className="mt-12 bg-white rounded-[2rem] p-8 lg:p-12 shadow-lg border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Аутсорсинг зарплаты и кадров</h3>
              <p className="text-slate-600">Доверьте расчет зарплат и сдачу отчетов профессионалам. Гарантируем точность и конфиденциальность.</p>
            </div>
            <div className="flex flex-wrap gap-4 w-full lg:w-auto">
              <Button size="lg" className="h-14 px-8 font-bold flex-1 lg:flex-none print:hidden" asChild>
                <Link href="/contacts">Заказать аудит</Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 font-bold flex-1 lg:flex-none border-slate-200 print:hidden" onClick={() => window.print()}>
                <Download className="w-5 h-5 mr-2" />
                PDF
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 font-bold flex-1 lg:flex-none border-slate-200 print:hidden" onClick={sendEmail} disabled={emailLoading}>
                <Mail className="w-5 h-5 mr-2" />
                Email
              </Button>
            </div>
          </div>
        )}

        {/* Print Layout */}
        {results && (
          <PrintResults
            title={`Расчет зарплаты (${year}) - ${method === 'gross' ? 'От оклада' : 'Обратный счет'}`}
            items={[
              { label: 'Начисленный оклад (Gross)', value: results.gross, highlight: method === 'net' },
              { label: 'ОПВ (Пенсионные)', value: results.opv },
              { label: 'ВОСМС (Взносы)', value: results.vosms },
              { label: 'ИПН (Налог)', value: results.ipn },
              { label: 'НА РУКИ (Net)', value: results.net, isTotal: true, highlight: method === 'gross' },
              { label: ' ', value: ' ' },
              { label: 'Затраты работодателя', value: results.totalEmployerCost, isTotal: true },
              { label: 'Соц. налог', value: results.sn },
              { label: 'Соц. отчисления', value: results.so },
              { label: 'ОСМС (Отчисления)', value: results.osms },
              { label: 'ОПВР (Взносы)', value: results.opvm },
            ]}
            footerText={`Расчет произведен для категории: ${category === 'employee' ? 'Штатный сотрудник' :
                category === 'pensioner' ? 'Пенсионер' :
                  category === 'disabled' ? 'Лицо с инвалидностью' : 'Договор ГПХ'
              }. ${hasDeduction ? `С применением вычета ${TAX_CONSTANTS[year].IPN_DEDUCTION_MRP} МРП.` : 'Без стандартного вычета.'}`}
          />
        )}
      </div>
    </main>
  )
}
