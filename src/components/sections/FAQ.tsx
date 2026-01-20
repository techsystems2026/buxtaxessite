import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Несете ли вы материальную ответственность за свою работу?",
    answer: "Да, мы несем полную финансовую ответственность за правильность ведения учета и своевременную сдачу отчетности. Это условие четко прописано в нашем договоре. В случае возникновения штрафов по нашей вине, мы возмещаем их в полном объеме."
  },
  {
    question: "Как быстро вы отвечаете на запросы клиентов?",
    answer: "В рабочее время среднее время ответа составляет не более 15-30 минут. За каждым клиентом закрепляется персональный бухгалтер, с которым можно связаться через удобный мессенджер, по почте или телефону."
  },
  {
    question: "Работаете ли вы с электронным документооборотом (ЭДО)?",
    answer: "Безусловно. Мы активно используем ИС ЭСФ, системы ЭДО (например, Documentolog) и помогаем нашим клиентам настроить безбумажное взаимодействие с контрагентами, что значительно ускоряет бизнес-процессы."
  },
  {
    question: "Можете ли вы восстановить учет, если он не велся несколько лет?",
    answer: "Да, мы специализируемся на восстановлении бухгалтерского и налогового учета любой сложности. Проведем аудит, выявим пробелы, восстановим первичную документацию и сдадим все недостающие отчеты."
  },
  {
    question: "Как происходит передача документов?",
    answer: "Большинство документов передается в электронном виде (сканы, фото, выгрузки из банков). Для оригиналов мы можем организовать курьерскую доставку или вы можете привезти их в наш офис."
  }
]

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 uppercase">ОТВЕТЫ НА ВОПРОСЫ</h2>
            <p className="text-lg text-slate-600 mb-8">
              Мы собрали ответы на вопросы, которые чаще всего волнуют наших клиентов при выборе партнера по бухгалтерии.
            </p>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h4 className="font-bold text-xl mb-2">Нужна консультация?</h4>
              <p className="text-slate-600 mb-6">Наши эксперты готовы детально разобрать вашу ситуацию.</p>
              <button className="bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-primary/90 transition-all">
                Задать свой вопрос
              </button>
            </div>
          </div>

          <div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-slate-200 rounded-2xl px-6 bg-white overflow-hidden shadow-sm transition-all data-[state=open]:border-primary/30 data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="text-left font-bold hover:no-underline py-5 text-slate-900">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-6 leading-relaxed">
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
