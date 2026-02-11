
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { RichText } from '@/components/RichText'
import { Calendar, ChevronLeft, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'blog',
      where: { slug: { equals: slug } },
    })

    if (!docs.length) return {}

    const post = docs[0]
    return {
      title: (post.seo as any)?.title || `${post.title} — BUX&TAXES`,
      description: (post.seo as any)?.description || post.excerpt,
    }
  } catch {
    return {
      title: 'Блог — BUX&TAXES'
    }
  }
}

export const dynamic = 'force-dynamic'

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  let post: any = null

  try {
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
      collection: 'blog',
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    if (docs.length > 0) {
      post = docs[0]
    }
  } catch (error) {
    console.error('Error fetching blog post:', error)
  }

  if (!post) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'BUX&TAXES',
    },
  }

  return (
    <article className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16 lg:py-24">
        <Link href="/blog" className="flex items-center gap-2 text-sm font-semibold text-primary mb-12">
          <ChevronLeft className="w-4 h-4" />
          Назад к списку статей
        </Link>

        <header className="mb-16">
          <div className="flex items-center gap-4 text-slate-500 mb-6">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.publishedAt ? new Date(post.publishedAt as string).toLocaleDateString('ru-RU') : ''}
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
              База знаний
            </span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed font-medium italic border-l-4 border-primary pl-6">
            {post.excerpt}
          </p>
        </header>

        <div className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-primary">
          {post.content ? (
            <RichText content={post.content as any} />
          ) : (
            <div className="text-slate-700 leading-8 space-y-6">
               <p>В этой статье мы подробно разберем основные аспекты выбранной темы. Как эксперты в области бухгалтерии в Казахстане, мы подготовили для вас актуальную информацию с учетом последних изменений в Налоговом кодексе.</p>
               <p>Материал готовится к публикации...</p>
            </div>
          )}
        </div>

        <footer className="mt-20 pt-12 border-t border-slate-100">
          <div className="bg-slate-50 rounded-[2rem] p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Остались вопросы по теме?</h3>
              <p className="text-slate-600">Наши эксперты помогут разобраться в нюансах вашего случая.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-14 px-8 font-bold" asChild>
                <Link href="/#contacts">Бесплатная консультация</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 font-bold border-slate-200" asChild>
                <a href="https://wa.me/77000000000" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-6 w-6 text-green-500" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </article>
  )
}
