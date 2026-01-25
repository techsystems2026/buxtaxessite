/* eslint-disable @typescript-eslint/no-explicit-any */
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST } from '@payloadcms/next/routes'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export const GET = async (req: any, { params }: any) => REST_GET(config)(req, { params: await params })
export const POST = async (req: any, { params }: any) => REST_POST(config)(req, { params: await params })
export const DELETE = async (req: any, { params }: any) => REST_DELETE(config)(req, { params: await params })
export const PATCH = async (req: any, { params }: any) => REST_PATCH(config)(req, { params: await params })
export const OPTIONS = async (req: any, { params }: any) => REST_OPTIONS(config)(req, { params: await params })
