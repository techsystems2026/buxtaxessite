'use client'

import * as React from 'react'
import Link from 'next/link'

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface FooterData {
  description: string
  linkColumns: FooterColumn[]
  copyright: string
  phone: string
  email: string
  address: string
}

const defaultFooter: FooterData = {
  description: 'Профессиональная бухгалтерия для ИП и ТОО в Казахстане.',
  linkColumns: [
    {
      title: 'Услуги',
      links: [
        { label: 'ИП', href: '/services/ip-bookkeeping' },
        { label: 'ТОО', href: '/services/too-bookkeeping' },
        { label: 'Отчетность', href: '/services/tax-reporting' },
      ],
    },
    {
      title: 'Информация',
      links: [
        { label: 'О нас', href: '/about' },
        { label: 'Блог', href: '/blog' },
        { label: 'Калькуляторы', href: '/calculators' },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} BUX&TAXES. Все права защищены.`,
  phone: '+7 (777) 123-45-67',
  email: 'info@buxtaxes.kz',
  address: 'г. Алматы',
}

export function Footer() {
  const [footerData, setFooterData] = React.useState<FooterData>(defaultFooter)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await fetch('/api/footer')
        if (res.ok) {
          const data = await res.json()
          setFooterData(data)
        }
      } catch (error) {
        console.error('Error fetching footer:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFooter()
  }, [])

  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <span className="text-2xl font-bold text-primary">BUX<span className="text-white">&</span>TAXES</span>
            <p className="text-sm leading-6 text-gray-300">
              {footerData.description}
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {footerData.linkColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-semibold leading-6 text-white">{column.title}</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Контакты</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="text-sm leading-6 text-gray-300">{footerData.address}</li>
                  <li className="text-sm leading-6 text-gray-300 whitespace-nowrap">{footerData.phone}</li>
                  <li className="text-sm leading-6 text-gray-300">{footerData.email}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
