import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Какие документы нужны для открытия ИП?",
    answer: "Для открытия ИП в Казахстане вам потребуются: удостоверение личности, электронно-цифровая подпись (ЭЦП), а также уведомление о начале деятельности в качестве индивидуального предпринимателя, которое подается через портал e-license или приложения банков."
  },
  {
    question: "Как часто нужно сдавать налоговую отчетность?",
    answer: "Частота сдачи отчетности зависит от выбранного налогового режима. Для упрощенной декларации отчетность сдается 2 раза в год (910 форма). Для общеустановленного режима — ежеквартально и ежегодно."
  },
  {
    question: "Зачем нужен бухгалтер на аутсорсе?",
    answer: "Аутсорсинг бухгалтерии позволяет сэкономить на содержании штатного сотрудника, покупке ПО и аренде офиса. Вы получаете доступ к команде экспертов, которые несут финансовую ответственность за свою работу."
  },
  {
    question: "Какие налоги платит ИП на упрощенке?",
    answer: "ИП на упрощенной декларации платит 3% от дохода (разделенные на ИПН и Социальный налог), а также социальные платежи за себя и сотрудников (ОПВ, СО, ОСМС)."
  },
  {
    question: "Работаете ли вы с НДС?",
    answer: "Да, мы предоставляем полное бухгалтерское сопровождение для плательщиков НДС, включая постановку на учет, ведение учета и сдачу 300-й формы отчетности."
  }
]

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 uppercase">ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ</h2>
            <p className="text-lg text-slate-600 mb-8">
              Мы собрали ответы на самые популярные вопросы наших клиентов. Если вы не нашли ответ на свой вопрос, свяжитесь с нами удобным для вас способом.
            </p>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-xl mb-2">Остались вопросы?</h4>
              <p className="text-slate-600 mb-6">Наши эксперты готовы проконсультировать вас по любому вопросу.</p>
              <button className="text-primary font-bold hover:underline">Задать свой вопрос →</button>
            </div>
          </div>

          <div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-slate-200 rounded-xl px-4 bg-white"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
