/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootPage } from '@payloadcms/next/views'
import config from '@/payload.config'

type Args = {
  params: Promise<{
    payload: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export default async function Page({ params, searchParams }: Args) {
  const resolvedParams = await params
  const payloadParams = Promise.resolve({
    segments: resolvedParams.payload || []
  })

  return RootPage({
    config,
    importMap: {},
    params: payloadParams,
    searchParams
  } as any)
}
