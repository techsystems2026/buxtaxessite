'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const steps = [
  {
    id: 'type',
    question: "Выберите ваш тип бизнеса",
    options: ["ИП (Индивидуальный предприниматель)", "ТОО (Товарищество с огр. ответственностью)", "Физ. лицо / Самозанятый"]
  },
  {
    id: 'regime',
    question: "Какая у вас система налогообложения?",
    options: ["Упрощенная декларация", "Общеустановленный режим", "Розничный налог", "Не знаю"]
  },
  {
    id: 'turnover',
    question: "Примерный оборот в месяц (в тенге)",
    options: ["До 1 млн", "1 - 5 млн", "5 - 20 млн", "Более 20 млн"]
  },
  {
    id: 'staff',
    question: "Количество сотрудников",
    options: ["Нет сотрудников", "1 - 5 человек", "5 - 20 человек", "Более 20 человек"]
  }
]

export function Quiz() {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [answers, setAnswers] = React.useState<Record<string, string>>({})
  const [isFinished, setIsFinished] = React.useState(false)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setIsFinished(true)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [steps[currentStep].id]: value }))
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  if (isFinished) {
    return (
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700 text-center">
            <h2 className="text-3xl font-bold mb-6">ОТЛИЧНО! МЫ ПОЧТИ ЗАКОНЧИЛИ</h2>
            <p className="text-slate-400 mb-8">Оставьте ваши контакты, и мы вышлем вам расчет стоимости в течение 15 минут</p>
            <form className="space-y-4 max-w-sm mx-auto">
              <Input placeholder="Ваше имя" className="bg-slate-700 border-slate-600 h-12" />
              <Input placeholder="+7 (___) ___-__-__" className="bg-slate-700 border-slate-600 h-12" />
              <Button className="w-full h-12 text-lg font-bold">Получить расчет</Button>
            </form>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 uppercase">ОТВЕТЬТЕ НА 4 ВОПРОСА</h2>
          <p className="text-slate-400">Получите расчет стоимости обслуживания и бесплатную консультацию</p>
        </div>

        <div className="max-w-3xl mx-auto bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-primary font-semibold">Вопрос {currentStep + 1} из {steps.length}</span>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="min-h-[300px]">
            <h3 className="text-xl md:text-2xl font-bold mb-8">{steps[currentStep].question}</h3>

            <RadioGroup
              value={answers[steps[currentStep].id] || ''}
              onValueChange={handleSelect}
              className="space-y-4"
            >
              {steps[currentStep].options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <div className={`flex items-center w-full p-4 rounded-xl border transition-all cursor-pointer ${
                    answers[steps[currentStep].id] === option
                      ? 'border-primary bg-primary/10'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}>
                    <RadioGroupItem value={option} id={option} className="sr-only" />
                    <Label
                      htmlFor={option}
                      className="flex-grow cursor-pointer text-base md:text-lg font-medium"
                    >
                      {option}
                    </Label>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      answers[steps[currentStep].id] === option ? 'border-primary' : 'border-slate-500'
                    }`}>
                      {answers[steps[currentStep].id] === option && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between mt-12 pt-8 border-t border-slate-700">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="bg-transparent border-slate-600 text-white hover:bg-slate-700 disabled:opacity-30"
            >
              Назад
            </Button>
            <Button
              onClick={handleNext}
              disabled={!answers[steps[currentStep].id]}
              className="min-w-[120px]"
            >
              {currentStep === steps.length - 1 ? 'К последнему шагу' : 'Далее'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
