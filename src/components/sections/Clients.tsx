import Image from 'next/image'

const clients = [
  { name: 'Client 1', logo: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=200&h=100&auto=format&fit=crop' },
  { name: 'Client 2', logo: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=200&h=100&auto=format&fit=crop' },
  { name: 'Client 3', logo: 'https://images.unsplash.com/photo-1614850523598-7253507c31d6?q=80&w=200&h=100&auto=format&fit=crop' },
  { name: 'Client 4', logo: 'https://images.unsplash.com/photo-1614850523000-022e0323971c?q=80&w=200&h=100&auto=format&fit=crop' },
  { name: 'Client 5', logo: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=200&h=100&auto=format&fit=crop' },
  { name: 'Client 6', logo: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=200&h=100&auto=format&fit=crop' },
]

export function Clients() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 uppercase">НАШИ КЛИЕНТЫ</h2>
          <p className="text-slate-600">Нам доверяют более 100 компаний по всему Казахстану</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {clients.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-8 bg-white rounded-2xl border border-slate-100 grayscale hover:grayscale-0 transition-all duration-300 shadow-sm"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={200}
                height={100}
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
