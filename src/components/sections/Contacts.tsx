import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export function Contacts() {
  return (
    <section id="contacts" className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="h-[400px] lg:h-[600px] bg-slate-100 rounded-3xl overflow-hidden relative border border-slate-200">
            {/* Using a placeholder for the map */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.772901235!2d76.9454!3d43.2389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDE0JzIwLjAiTiA3NsKwNTYnNDMuNCJF!5e0!3m2!1sen!2skz!4v1620000000000!5m2!1sen!2skz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>
          </div>

          <div className="lg:py-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 uppercase">КОНТАКТЫ</h2>
            <p className="text-lg text-slate-600 mb-12">
              Мы всегда на связи и готовы ответить на ваши вопросы. Посетите наш офис или свяжитесь с нами по телефону.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Адрес</h4>
                  <p className="text-slate-600">г. Алматы, пр. Аль-Фараби 17, БЦ &quot;Нурлы Тау&quot;</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Телефон</h4>
                  <p className="text-slate-600 font-medium text-xl">+7 (777) 123-45-67</p>
                  <p className="text-slate-600">+7 (727) 321-45-67</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email</h4>
                  <p className="text-slate-600">info@buxtaxes.kz</p>
                  <p className="text-slate-600">support@buxtaxes.kz</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Режим работы</h4>
                  <p className="text-slate-600">Пн - Пт: 09:00 - 18:00</p>
                  <p className="text-slate-600">Сб - Вс: Выходной</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
