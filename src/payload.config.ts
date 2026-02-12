import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users, Services, Tariffs, Blog, FAQ, Leads, Categories, Media, Clients, Pages } from './collections/config'
import { SiteSettings, Navigation, FooterConfig } from './globals/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Services, Tariffs, Blog, FAQ, Leads, Categories, Media, Clients, Pages],
  globals: [SiteSettings, Navigation, FooterConfig],
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_HERE',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  editor: lexicalEditor({}),
  routes: {
    admin: '/admin',
    api: '/api',
    graphQL: '/graphql',
    graphQLPlayground: '/graphql-playground',
  },
})
