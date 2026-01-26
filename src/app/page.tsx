import { Hero } from '@/components/sections/Hero'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { LatestNews } from '@/components/sections/LatestNews'
import { Quiz } from '@/components/sections/Quiz'
import { FAQ } from '@/components/sections/FAQ'
import { Clients } from '@/components/sections/Clients'
import { Contacts } from '@/components/sections/Contacts'

export const dynamic = 'force-dynamic'

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://buxtaxes.kz'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BUX&TAXES',
    url: siteUrl,
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ServicesOverview />
      <LatestNews />
      <Quiz />
      <FAQ />
      <Clients />
      <Contacts />
    </main>
  )
}
