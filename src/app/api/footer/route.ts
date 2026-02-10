import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const payload = await getPayload({ config })
        const footer = await payload.findGlobal({
            slug: 'footerConfig',
        }) as any

        const siteSettings = await payload.findGlobal({
            slug: 'siteSettings',
        }) as any

        return NextResponse.json({
            description: footer?.description || 'Профессиональная бухгалтерия для ИП и ТОО в Казахстане.',
            linkColumns: footer?.linkColumns || [
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
            copyright: footer?.copyright || `© ${new Date().getFullYear()} BUX&TAXES. Все права защищены.`,
            phone: siteSettings?.phone || '+7 (777) 123-45-67',
            email: siteSettings?.email || 'info@buxtaxes.kz',
            address: siteSettings?.address || 'г. Алматы',
        })
    } catch (error) {
        console.error('Error fetching footer:', error)
        return NextResponse.json({
            description: 'Профессиональная бухгалтерия для ИП и ТОО в Казахстане.',
            linkColumns: [
                {
                    title: 'Услуги',
                    links: [
                        { label: 'ИП', href: '/services/ip-bookkeeping' },
                        { label: 'ТОО', href: '/services/too-bookkeeping' },
                    ],
                },
                {
                    title: 'Информация',
                    links: [
                        { label: 'О нас', href: '/about' },
                        { label: 'Блог', href: '/blog' },
                    ],
                },
            ],
            copyright: `© ${new Date().getFullYear()} BUX&TAXES. Все права защищены.`,
            phone: '+7 (777) 123-45-67',
            email: 'info@buxtaxes.kz',
            address: 'г. Алматы',
        })
    }
}
