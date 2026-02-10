import type { CollectionConfig } from 'payload'

export const Tariffs: CollectionConfig = {
    slug: 'tariffs',
    admin: {
        useAsTitle: 'name',
        group: 'Контент',
        defaultColumns: ['name', 'category', 'price'],
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
            name: 'name',
            type: 'text',
            required: true,
            label: 'Название тарифа',
        },
        {
            name: 'category',
            type: 'select',
            required: true,
            label: 'Категория',
            options: [
                { label: 'ИП', value: 'IP' },
                { label: 'ТОО без НДС', value: 'TOO_NO_VAT' },
                { label: 'ТОО с НДС', value: 'TOO_VAT' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'price',
            type: 'text',
            required: true,
            label: 'Цена',
        },
        {
            name: 'features',
            type: 'array',
            label: 'Что входит',
            fields: [
                {
                    name: 'feature',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'format',
            type: 'text',
            label: 'Формат работы',
        },
        {
            name: 'responsibility',
            type: 'textarea',
            label: 'Ответственность',
        },
        {
            name: 'isPopular',
            type: 'checkbox',
            label: 'Популярный тариф',
            defaultValue: false,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'order',
            type: 'number',
            label: 'Порядок сортировки',
            admin: {
                position: 'sidebar',
            },
        },
    ],
}
