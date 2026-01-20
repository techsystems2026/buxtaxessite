'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import React from 'react'

export function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.success('Заявка отправлена!')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Ваше имя" required />
      <Input placeholder="Телефон" required />
      <Textarea placeholder="Комментарий" />
      <Button type="submit" className="w-full">Отправить</Button>
    </form>
  )
}
