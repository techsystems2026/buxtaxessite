import type { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
    slug: 'blog',
    admin: {
        useAsTitle: 'title',
        group: 'Контент',
        defaultColumns: ['title', 'category', 'publishedAt'],
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
            label: 'Заголовок статьи',
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
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            label: 'Категория',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'tags',
            type: 'array',
            label: 'Теги',
            admin: {
                position: 'sidebar',
            },
            fields: [
                {
                    name: 'tag',
                    type: 'text',
                },
            ],
        },
        {
            name: 'excerpt',
            type: 'textarea',
            required: true,
            label: 'Краткое описание (для карточек)',
            admin: {
                description: 'Выводится в карточках на странице блога и в превью',
            },
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
            label: 'Содержание статьи',
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Обложка статьи',
        },
        {
            name: 'publishedAt',
            type: 'date',
            label: 'Дата публикации',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'isFeatured',
            type: 'checkbox',
            label: 'Избранная статья',
            defaultValue: false,
            admin: {
                position: 'sidebar',
            },
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
