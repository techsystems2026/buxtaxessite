import type { Block } from 'payload'

export const ClientsBlock: Block = {
    slug: 'clientsBlock',
    interfaceName: 'ClientsBlock',
    labels: {
        singular: 'Блок клиентов',
        plural: 'Блоки клиентов',
    },
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            label: 'Заголовок',
            defaultValue: 'НАШИ КЛИЕНТЫ',
        },
        {
            name: 'subtitle',
            type: 'textarea',
            label: 'Подзаголовок',
        },
        {
            name: 'showFromCollection',
            type: 'checkbox',
            label: 'Показывать из коллекции Clients',
            defaultValue: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'clientsCount',
            type: 'number',
            label: 'Количество клиентов для показа',
            defaultValue: 6,
            admin: {
                condition: (data) => data?.showFromCollection === true,
            },
        },
        {
            name: 'fallbackLogos',
            type: 'array',
            label: 'Логотипы (если нет в коллекции)',
            admin: {
                condition: (data) => data?.showFromCollection !== true,
            },
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                    label: 'Название',
                },
                {
                    name: 'logo',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'Логотип',
                },
            ],
        },
    ],
}
