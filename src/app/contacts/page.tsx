import { ContactForm } from '@/components/forms/ContactForm'
export default function ContactsPage() {
  return (
    <div className="p-20 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Контакты</h1>
      <ContactForm />
    </div>
  )
}
