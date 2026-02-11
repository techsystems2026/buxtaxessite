
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST } from '@payloadcms/next/routes'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export const GET = async (req: Request, { params }: { params: Promise<any> }) => {
    return REST_GET(config)(req, { params: await params })
}
export const POST = async (req: Request, { params }: { params: Promise<any> }) => {
    return REST_POST(config)(req, { params: await params })
}
export const DELETE = async (req: Request, { params }: { params: Promise<any> }) => {
    return REST_DELETE(config)(req, { params: await params })
}
export const PATCH = async (req: Request, { params }: { params: Promise<any> }) => {
    return REST_PATCH(config)(req, { params: await params })
}
export const OPTIONS = async (req: Request, { params }: { params: Promise<any> }) => {
    return REST_OPTIONS(config)(req, { params: await params })
}
