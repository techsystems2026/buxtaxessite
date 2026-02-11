
import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let services: any[] = []
  let posts: any[] = []

  try {
    const payload = await getPayload({ config })

    const servicesResult = await payload.find({
      collection: 'services',
      limit: 100,
    })
    services = servicesResult.docs

    const postsResult = await payload.find({
      collection: 'blog',
      limit: 100,
    })
    posts = postsResult.docs
  } catch (e) {
    console.error('Sitemap generation error:', e)
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://buxtaxes.kz'

  const serviceUrls = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const postUrls = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tariffs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...serviceUrls,
    ...postUrls,
  ]
}
