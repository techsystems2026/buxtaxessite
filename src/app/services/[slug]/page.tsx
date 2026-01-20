import { use } from 'react'
import Link from 'next/link'

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  return (
    <div className="p-20">
      <Link href="/" className="text-primary mb-4 block">← Назад</Link>
      <h1 className="text-3xl font-bold">Услуга: {slug}</h1>
      <p className="mt-4">Детальное описание услуги будет здесь.</p>
    </div>
  )
}
