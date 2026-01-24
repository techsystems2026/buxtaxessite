'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calculator as CalcIcon, Download, RefreshCw, Info, Mail } from 'lucide-react'
import Link from 'next/link'

interface SalaryResults {
  opv: number
  vosms: number
  ipn: number
  netSalary: number
  so: number
  osms: number
  sn: number
  totalEmployerCost: number
}

export default function SalaryCalculatorPage() {
  const [grossSalary, setGrossSalary] = useState<number>(0)
  const [results, setResults] = useState<SalaryResults | null>(null)
  const [emailLoading, setEmailLoading] = useState(false)

  const sendEmail = async () => {
    if (!results) return
    setEmailLoading(true)
    try {
      const message = `Расчет зарплаты (2025):
Оклад: ${grossSalary} ₸
На руки: ${results.netSalary} ₸
ОПВ: ${results.opv} ₸
ВОСМС: ${results.vosms} ₸
ИПН: ${results.ipn} ₸
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
        alert('Запрос на отправку результатов принят! Мы вышлем расчет на вашу почту (укажите её в форме контактов ниже для связи).')
      }
    } catch {
      alert('Ошибка при отправке.')
    } finally {
      setEmailLoading(false)
    }
  }

  const calculate = () => {
    if (grossSalary <= 0) return

    // 2025 constants
    const MRP = 3932
    // const MIN_WAGE = 85000 // MZP

    // Employee deductions
    const opv = grossSalary * 0.10
    const vosms = grossSalary * 0.02

    // IPN (Income tax) - simplified: (Gross - OPV - VOSMS - 14*MRP) * 0.10
    const ipnDeduction = 14 * MRP
    const ipnBase = grossSalary - opv - vosms - ipnDeduction
    const ipn = ipnBase > 0 ? ipnBase * 0.10 : 0

    const netSalary = grossSalary - opv - vosms - ipn

    // Employer taxes
    const so = (grossSalary - opv) * 0.035
    const osms = grossSalary * 0.03

    // SN (Social tax) - (Gross - OPV - VOSMS) * 9.5% - SO
    const snBase = grossSalary - opv - vosms
    let sn = (snBase * 0.095) - so
    if (sn < 0) sn = 0

    const totalEmployerCost = grossSalary + osms + sn + so // Simplified

    setResults({
      opv,
      vosms,
      ipn,
      netSalary,
      so,
      osms,
      sn,
      totalEmployerCost
    })
  }

  return (
    <main className="bg-slate-50 py-24 min-h-screen">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4 uppercase">КАЛЬКУЛЯТОР ЗАРПЛАТЫ</h1>
          <p className="text-xl text-slate-600">Рассчитайте налоги и отчисления с заработной платы сотрудника в 2025 году.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="rounded-[2rem] border-none shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalcIcon className="text-primary" />
                Ввод данных
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="salary">Оклад на руки или к начислению (Gross)?</Label>
                <div className="relative">
                  <Input
                    id="salary"
                    type="number"
                    placeholder="Например: 250000"
                    className="h-14 text-lg pl-4 pr-12 rounded-xl"
                    value={grossSalary || ''}
                    onChange={(e) => setGrossSalary(Number(e.target.value))}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₸</span>
                </div>
              </div>
              <Button onClick={calculate} className="w-full h-14 text-lg font-bold rounded-xl">
                Рассчитать
              </Button>
              <div className="p-4 bg-primary/5 rounded-xl flex gap-3 text-sm text-slate-600">
                <Info className="w-5 h-5 text-primary flex-shrink-0" />
                <p>Расчет производится согласно налоговому кодексу РК на 2025 год для общеустановленного режима.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-xl bg-slate-900 text-white">
            <CardHeader>
              <CardTitle>Результаты расчета</CardTitle>
            </CardHeader>
            <CardContent>
              {!results ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-700 rounded-3xl">
                  <RefreshCw className="w-12 h-12 mb-4 animate-spin-slow" />
                  <p>Введите сумму для расчета</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <div className="text-slate-400 text-sm mb-1">Чистая зарплата (на руки)</div>
                    <div className="text-4xl font-bold text-primary">{results.netSalary.toLocaleString()} ₸</div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-slate-800">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">ОПВ (10%)</span>
                      <span className="font-medium">-{results.opv.toLocaleString()} ₸</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">ВОСМС (2%)</span>
                      <span className="font-medium">-{results.vosms.toLocaleString()} ₸</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">ИПН (10%)</span>
                      <span className="font-medium">-{results.ipn.toLocaleString()} ₸</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-slate-800">
                    <div className="text-sm font-bold text-slate-300">Расходы работодателя</div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">СО (3.5%)</span>
                      <span className="font-medium">{results.so.toLocaleString()} ₸</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">ОСМС (3%)</span>
                      <span className="font-medium">{results.osms.toLocaleString()} ₸</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Соц. налог</span>
                      <span className="font-medium">{results.sn.toLocaleString()} ₸</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 text-primary">
                      <span>Итого стоимость</span>
                      <span>{results.totalEmployerCost.toLocaleString()} ₸</span>
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
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Нужен детальный расчет или аудит зарплат?</h3>
              <p className="text-slate-600">Оставьте заявку, и мы поможем оптимизировать налоги на ФОТ и настроить кадровый учет без ошибок.</p>
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
