'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import React, { useState } from 'react'

export function ContactForm() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.')
        ;(e.target as HTMLFormElement).reset()
      } else {
        throw new Error('Failed to submit')
      }
    } catch {
      toast.error('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-6 text-slate-900">Оставить заявку</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Имя</label>
            <Input name="name" placeholder="Как к вам обращаться?" required className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Телефон</label>
            <Input name="phone" placeholder="+7 (___) ___-__-__" required className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Сообщение (необязательно)</label>
            <Textarea name="message" placeholder="Опишите вашу задачу или вопрос" className="min-h-[120px] rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all" />
          </div>
          <Button type="submit" className="w-full h-14 text-lg font-bold rounded-xl mt-4 shadow-lg shadow-primary/20" disabled={loading}>
            {loading ? 'Отправка...' : 'Получить консультацию'}
          </Button>
          <p className="text-[10px] text-slate-400 text-center mt-4">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности и обработкой персональных данных.
          </p>
        </div>
      </div>
    </form>
  )
}
