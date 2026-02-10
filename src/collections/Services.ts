import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
    slug: 'services',
    admin: {
        useAsTitle: 'title',
        group: 'Контент',
        defaultColumns: ['title', 'slug', 'priceFrom'],
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
            label: 'Название услуги',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            label: 'Slug',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'h1',
            type: 'text',
            label: 'Заголовок H1 (если отличается от названия)',
        },
        {
            name: 'icon',
            type: 'select',
            label: 'Иконка',
            options: [
                { label: 'Портфель', value: 'briefcase' },
                { label: 'Калькулятор', value: 'calculator' },
                { label: 'Здание', value: 'building' },
                { label: 'Файл', value: 'file-text' },
                { label: 'Щит', value: 'shield' },
                { label: 'Пользователи', value: 'users' },
                { label: 'Кошелек', value: 'wallet' },
                { label: 'Ключ', value: 'key' },
            ],
            defaultValue: 'briefcase',
        },
        {
            name: 'shortDescription',
            type: 'textarea',
            required: true,
            label: 'Краткое описание',
        },
        {
            name: 'fullDescription',
            type: 'richText',
            label: 'Полное описание',
        },
        {
            name: 'whatIsIncluded',
            type: 'array',
            label: 'Что входит в услугу',
            fields: [
                {
                    name: 'item',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'reports',
            type: 'array',
            label: 'Какие отчеты сдаем',
            fields: [
                {
                    name: 'report',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'whoLeadsAccount',
            type: 'text',
            label: 'Кто ведет учет',
        },
        {
            name: 'responsibility',
            type: 'textarea',
            label: 'Ответственность',
        },
        {
            name: 'priceFrom',
            type: 'text',
            label: 'Цена от',
        },
        {
            name: 'faq',
            type: 'array',
            label: 'FAQ по услуге',
            fields: [
                {
                    name: 'question',
                    type: 'text',
                    required: true,
                    label: 'Вопрос',
                },
                {
                    name: 'answer',
                    type: 'textarea',
                    required: true,
                    label: 'Ответ',
                },
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
            ],
        },
    ],
}
