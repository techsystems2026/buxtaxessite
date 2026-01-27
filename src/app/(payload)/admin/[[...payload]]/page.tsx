/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootPage } from '@payloadcms/next/views'
import config from '@/payload.config'

import { importMap } from '../importMap'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    payload: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export default async function Page(props: Args) {
  const params = await props.params
  const searchParams = await props.searchParams

  return RootPage({
    config,
    importMap,
    params,
    searchParams,
  } as any)
}
