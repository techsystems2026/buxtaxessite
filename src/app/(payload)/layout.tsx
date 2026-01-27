import { RootLayout } from '@payloadcms/next/layouts'
import config from '@/payload.config'
import React from 'react'
import { importMap } from './admin/importMap'
import { serverFunction } from './actions'

export const dynamic = 'force-dynamic'

type Args = {
  children: React.ReactNode
}

export default async function Layout({ children }: Args) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  )
}
