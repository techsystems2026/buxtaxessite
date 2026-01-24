import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  publishedAt?: string | null
}

export default async function BlogPage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'blog',
    sort: '-publishedAt',
  })
  const posts = docs as unknown as BlogPost[]

  return (
    <main className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4 uppercase">БАЗА ЗНАНИЙ</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Полезные статьи, гайды и новости законодательства Казахстана для предпринимателей.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col border-none shadow-lg hover:shadow-xl transition-all rounded-3xl overflow-hidden bg-white group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('ru-RU') : ''}
                </div>
                <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col pt-0">
                <p className="text-slate-600 mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <Button variant="link" className="p-0 h-auto font-bold text-primary flex items-center gap-2" asChild>
                    <Link href={`/blog/${post.slug}`}>
                      Читать полностью <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {posts.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-500">
              Статей пока нет, но они скоро появятся.
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
