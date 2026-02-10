import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    admin: {
        group: 'Контент',
    },
    upload: {
        staticDir: 'media',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'card',
                width: 768,
                height: 512,
                position: 'centre',
            },
            {
                name: 'hero',
                width: 1920,
                height: 1080,
                position: 'centre',
            },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
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
            name: 'alt',
            type: 'text',
            required: true,
        },
    ],
}
