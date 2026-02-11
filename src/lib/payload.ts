import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getPayloadClient() {
    return await getPayload({ config })
}

export async function getPageBySlug(slug: string) {
    const payload = await getPayloadClient()
    const result = await payload.find({
        collection: 'pages',
        where: { slug: { equals: slug } },
    })
    return result.docs[0] || null
}

export async function getGlobal<T>(slug: string): Promise<T | null> {
    const payload = await getPayloadClient()
    try {
        const result = await payload.findGlobal({
            slug: slug as any,
        })
        return result as T
    } catch {
        return null
    }
}
