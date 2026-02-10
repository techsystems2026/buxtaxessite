'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavItem {
  label: string
  href: string
}

interface NavData {
  items: NavItem[]
  ctaButton: {
    text: string
    href: string
  }
  phone: string
}

const defaultNav: NavData = {
  items: [
    { label: 'Услуги', href: '/#services' },
    { label: 'Тарифы', href: '/tariffs' },
    { label: 'Калькуляторы', href: '/calculators' },
    { label: 'О компании', href: '/about' },
    { label: 'Блог', href: '/blog' },
    { label: 'Контакты', href: '/contacts' },
  ],
  ctaButton: { text: 'Заказать звонок', href: '/contacts' },
  phone: '+7 (777) 123-45-67',
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [navData, setNavData] = React.useState<NavData>(defaultNav)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchNav = async () => {
      try {
        const res = await fetch('/api/navigation')
        if (res.ok) {
          const data = await res.json()
          setNavData(data)
        }
      } catch (error) {
        console.error('Error fetching navigation:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchNav()
  }, [])

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">BUX<span className="text-foreground">&</span>TAXES</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navData.items.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4 items-center">
          <a href={`tel:${navData.phone.replace(/\s/g, '')}`} className="text-sm font-semibold flex items-center gap-2 whitespace-nowrap">
            <Phone className="h-4 w-4 text-primary" />
            {navData.phone}
          </a>
          <Button asChild>
            <Link href={navData.ctaButton.href}>{navData.ctaButton.text}</Link>
          </Button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white p-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold text-primary">BUX&TAXES</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navData.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Button className="w-full" asChild>
                  <Link href={navData.ctaButton.href} onClick={() => setMobileMenuOpen(false)}>
                    {navData.ctaButton.text}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
