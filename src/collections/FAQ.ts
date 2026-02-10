import type { CollectionConfig } from 'payload'

export const FAQ: CollectionConfig = {
    slug: 'faq',
    admin: {
        useAsTitle: 'question',
        group: 'Контент',
        defaultColumns: ['question', 'category'],
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
        {
            name: 'category',
            type: 'select',
            label: 'Категория',
            options: [
                { label: 'Общие вопросы', value: 'general' },
                { label: 'ИП', value: 'ip' },
                { label: 'ТОО', value: 'too' },
                { label: 'Налоги', value: 'taxes' },
                { label: 'Бухгалтерия', value: 'accounting' },
            ],
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
