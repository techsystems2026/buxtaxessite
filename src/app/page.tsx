import { Hero } from '@/components/sections/Hero'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { LatestNews } from '@/components/sections/LatestNews'
import { Quiz } from '@/components/sections/Quiz'
import { FAQ } from '@/components/sections/FAQ'
import { Clients } from '@/components/sections/Clients'
import { Contacts } from '@/components/sections/Contacts'

export default function Home() {
  return (
    <main>
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
