/* eslint-disable @typescript-eslint/no-explicit-any */
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST } from '@payloadcms/next/routes'
import config from '@/payload.config'

export const GET = (req: any, { params }: any) => REST_GET(config)(req, { params })
export const POST = (req: any, { params }: any) => REST_POST(config)(req, { params })
export const DELETE = (req: any, { params }: any) => REST_DELETE(config)(req, { params })
export const PATCH = (req: any, { params }: any) => REST_PATCH(config)(req, { params })
export const OPTIONS = (req: any, { params }: any) => REST_OPTIONS(config)(req, { params })
