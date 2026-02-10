import type { CollectionConfig } from 'payload'
import {
    HeroBlock,
    ServicesOverviewBlock,
    LatestNewsBlock,
    FAQBlock,
    QuizBlock,
    ClientsBlock,
    ContactInfoBlock,
    ContactFormBlock,
    CTABlock,
    StatsGridBlock,
    RichContentBlock,
    ToolsPreviewBlock,
    TariffsBlock,
    ValuesBlock,
} from '../blocks'

export const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
        group: 'Страницы',
        defaultColumns: ['title', 'slug', 'updatedAt'],
    },
    access: {
        read: () => true,
        admin: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
        create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
        update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
        delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Название страницы',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            label: 'URL slug',
            admin: {
                description: 'Например: home, about, contacts (без слешей в начале)',
                position: 'sidebar',
            },
        },
        {
            name: 'layout',
            type: 'blocks',
            required: true,
            label: 'Секции страницы',
            blocks: [
                HeroBlock,
                ServicesOverviewBlock,
                LatestNewsBlock,
                FAQBlock,
                QuizBlock,
                ClientsBlock,
                ContactInfoBlock,
                ContactFormBlock,
                CTABlock,
                StatsGridBlock,
                RichContentBlock,
                ToolsPreviewBlock,
                TariffsBlock,
                ValuesBlock,
            ],
        },
        {
            name: 'seo',
            type: 'group',
            label: 'SEO',
            admin: {
                position: 'sidebar',
            },
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    label: 'SEO Title',
                },
                {
                    name: 'description',
                    type: 'textarea',
                    label: 'SEO Description',
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'OG Image',
                },
            ],
        },
    ],
}
