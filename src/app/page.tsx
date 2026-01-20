import { Hero } from '@/components/sections/Hero'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12">Часто задаваемые вопросы</h2>
          <Accordion type="single" collapsible className="text-left">
            <AccordionItem value="item-1">
              <AccordionTrigger>Как начать с вами работать?</AccordionTrigger>
              <AccordionContent>
                Оставьте заявку на сайте или свяжитесь с нами по WhatsApp.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  )
}
