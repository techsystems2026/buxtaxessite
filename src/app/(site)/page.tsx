import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { RenderBlocks } from '@/components/RenderBlocks'

interface HomePageProps {
  params: Promise<{
    slug: string[]
  }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'BUX&TAXES — бухгалтерия для ИП и ТОО в Казахстане',
    description: 'Ведём учёт, налоги, ЭСФ и СНТ. Берём на себя отчёты и общение с налоговой.',
  }
}

export default async function HomePage() {
  try {
    const payload = await getPayload({ config })

    const page = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
    })

    if (!page.docs.length) {
      // Return default blocks if no page created yet
      return (
        <main>
          <RenderBlocks blocks={[]} />
        </main>
      )
    }

    const pageData = page.docs[0]

    return (
      <main>
        <RenderBlocks blocks={pageData.layout as any} />
      </main>
    )
  } catch (error) {
    console.error('Error fetching home page:', error)
    return (
      <main>
        <RenderBlocks blocks={[]} />
      </main>
    )
  }
}
