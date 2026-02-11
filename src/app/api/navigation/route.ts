import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const payload = await getPayload({ config })
        const navigation = await payload.findGlobal({
            slug: 'navigation',
        }) as any

        const siteSettings = await payload.findGlobal({
            slug: 'site-settings',
        }) as any

        return NextResponse.json({
            items: (navigation?.items as any[])?.map((item: any) => ({
                label: item.label,
                href: item.url
            })) || [
                { label: 'Услуги', href: '/#services' },
                { label: 'Тарифы', href: '/tariffs' },
                { label: 'Калькуляторы', href: '/calculators' },
                { label: 'О компании', href: '/about' },
                { label: 'Блог', href: '/blog' },
                { label: 'Контакты', href: '/contacts' },
            ],
            ctaButton: navigation?.ctaButton ? {
                text: navigation.ctaButton.label,
                href: navigation.ctaButton.url
            } : { text: 'Заказать звонок', href: '/contacts' },
            phone: siteSettings?.phone || '+7 (777) 123-45-67',
        })
    } catch (error) {
        console.error('Error fetching navigation:', error)
        return NextResponse.json({
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
        })
    }
}
