import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { RenderBlocks } from '@/components/RenderBlocks'

interface DynamicPageProps {
    params: Promise<{
        slug: string[]
    }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
    const { slug } = await params
    const slugPath = slug.join('/')

    try {
        const payload = await getPayload({ config })
        const page = await payload.find({
            collection: 'pages',
            where: { slug: { equals: slugPath } },
        })

        if (!page.docs.length) {
            return { title: 'Страница не найдена' }
        }

        const pageData = page.docs[0]
        return {
            title: (pageData.seo as any)?.title || `${pageData.title} — BUX&TAXES`,
            description: (pageData.seo as any)?.description,
        }
    } catch {
        return { title: 'Ошибка' }
    }
}

export default async function DynamicPage({ params }: DynamicPageProps) {
    const { slug } = await params
    const slugPath = slug.join('/')

    try {
        const payload = await getPayload({ config })
        const page = await payload.find({
            collection: 'pages',
            where: { slug: { equals: slugPath } },
        })

        if (!page.docs.length) {
            notFound()
        }

        const pageData = page.docs[0]

        return (
            <main>
                <RenderBlocks blocks={pageData.layout as any} />
            </main>
        )
    } catch (error) {
        console.error('Error fetching page:', error)
        notFound()
    }
}
