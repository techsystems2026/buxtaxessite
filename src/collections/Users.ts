import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
    slug: 'users',
    auth: {
        maxLoginAttempts: 100,
        lockTime: 1000,
    },
    admin: {
        useAsTitle: 'email',
        group: 'Система',
    },
    access: {
        admin: ({ req: { user } }) => user?.role === 'admin',
        read: ({ req: { user } }) => {
            if (user?.role === 'admin') return true
            return { id: { equals: user?.id } }
        },
        update: ({ req: { user } }) => user?.role === 'admin',
        create: ({ req: { user } }) => user?.role === 'admin',
        delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
        {
            name: 'role',
            type: 'select',
            options: [
                { label: 'Администратор', value: 'admin' },
                { label: 'Редактор', value: 'editor' },
            ],
            defaultValue: 'editor',
            required: true,
            access: {
                update: ({ req: { user } }) => user?.role === 'admin',
            },
        },
    ],
}
