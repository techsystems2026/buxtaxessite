import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

interface NewsItem {
  title: string
  excerpt?: string | null
  publishedAt?: string | null
  slug: string
}

export async function LatestNews() {
  let docs = []
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'blog',
      limit: 3,
      sort: '-publishedAt',
    })
    docs = result.docs
  } catch (error) {
    console.error('Error fetching news:', error)
  }

  // Fallback
  const displayNews = (docs.length > 0 ? docs : [
    {
      title: 'Изменения в налоговом кодексе 2025',
      excerpt: 'Разбираем основные поправки, которые коснутся малого и среднего бизнеса в Казахстане в новом году.',
      publishedAt: '2024-12-01',
      slug: 'tax-changes-2025',
    },
    {
      title: 'Как ИП сдать 910 форму без штрафов',
      excerpt: 'Пошаговая инструкция по заполнению упрощенной декларации для индивидуальных предпринимателей.',
      publishedAt: '2024-11-15',
      slug: 'form-910-guide',
    },
    {
      title: 'Штрафы за просрочку отчетности в РК',
      excerpt: 'Какие санкции предусмотрены за несвоевременное предоставление налоговой отчетности.',
      publishedAt: '2024-10-20',
      slug: 'tax-penalties',
    }
  ]) as unknown as NewsItem[]

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl uppercase">БАЗА ЗНАНИЙ</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Полезные статьи и актуальные изменения в законодательстве от наших экспертов.
            </p>
          </div>
          <Link href="/blog" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
            Все статьи <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayNews.map((item) => (
            <article key={item.slug} className="flex flex-col items-start bg-slate-50 rounded-[2rem] overflow-hidden hover:shadow-xl transition-all border border-slate-100 group">
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                  <Calendar className="w-4 h-4" />
                  {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('ru-RU') : ''}
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm mb-8 line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>
                <Link href={`/blog/${item.slug}`} className="mt-auto text-primary font-bold text-sm flex items-center gap-2">
                  Читать полностью <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
