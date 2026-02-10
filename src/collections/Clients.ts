import type { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
    slug: 'clients',
    admin: {
        useAsTitle: 'name',
        group: 'Контент',
        defaultColumns: ['name', 'order'],
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
            label: 'Название компании',
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'Логотип',
        },
        {
            name: 'url',
            type: 'text',
            label: 'Ссылка на сайт',
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
