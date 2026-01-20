'use client'

import * as React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const categories = ['Все', 'Налоги', 'Законодательство', 'Аналитика']

const news = [
  {
    id: 1,
    title: 'Изменения в налоговом кодексе 2024',
    excerpt: 'Разбираем основные поправки, которые коснутся малого и среднего бизнеса в Казахстане.',
    date: '10 мая 2024',
    category: 'Законодательство',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Как оптимизировать налоги ИП на упрощенке',
    excerpt: 'Практические советы по законному снижению налоговой нагрузки для индивидуальных предпринимателей.',
    date: '5 мая 2024',
    category: 'Налоги',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Анализ рынка бухгалтерских услуг Алматы',
    excerpt: 'Обзор текущих трендов и ценообразования на рынке аутсорсинга бухгалтерии.',
    date: '28 апреля 2024',
    category: 'Аналитика',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  }
]

export function LatestNews() {
  const [activeCategory, setActiveCategory] = React.useState('Все')

  const filteredNews = activeCategory === 'Все'
    ? news
    : news.filter(item => item.category === activeCategory)

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">ПОСЛЕДНИЕ НОВОСТИ</h2>
            <p className="mt-4 text-lg text-gray-600">
              Следите за актуальными изменениями в мире финансов и налогов вместе с нами
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <article key={item.id} className="flex flex-col items-start bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-4 left-4 font-medium">
                  {item.category}
                </Badge>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <time dateTime="2024-05-10" className="text-sm text-gray-500 mb-2">
                  {item.date}
                </time>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {item.excerpt}
                </p>
                <button className="mt-auto text-primary font-semibold text-sm hover:underline flex items-center gap-1">
                  Читать далее <span>&rarr;</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
