import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
    slug: 'leads',
    admin: {
        useAsTitle: 'name',
        group: 'Заявки',
        defaultColumns: ['name', 'phone', 'email', 'status', 'createdAt'],
    },
    access: {
        create: () => true,
        read: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Имя',
        },
        {
            name: 'phone',
            type: 'text',
            required: true,
            label: 'Телефон',
        },
        {
            name: 'email',
            type: 'text',
            label: 'Email',
        },
        {
            name: 'message',
            type: 'textarea',
            label: 'Сообщение',
        },
        {
            name: 'source',
            type: 'text',
            label: 'Источник',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'status',
            type: 'select',
            label: 'Статус',
            options: [
                { label: 'Новая', value: 'new' },
                { label: 'В обработке', value: 'contacted' },
                { label: 'Закрыта', value: 'closed' },
                { label: 'Отклонена', value: 'rejected' },
            ],
            defaultValue: 'new',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'notes',
            type: 'textarea',
            label: 'Заметки',
            admin: {
                position: 'sidebar',
            },
        },
    ],
}
