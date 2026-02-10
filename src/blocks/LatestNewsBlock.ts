import type { Block } from 'payload'

export const LatestNewsBlock: Block = {
    slug: 'latestNewsBlock',
    interfaceName: 'LatestNewsBlock',
    labels: {
        singular: 'Блок новостей',
        plural: 'Блоки новостей',
    },
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            label: 'Заголовок',
            defaultValue: 'БАЗА ЗНАНИЙ',
        },
        {
            name: 'subtitle',
            type: 'textarea',
            label: 'Подзаголовок',
        },
        {
            name: 'showCount',
            type: 'number',
            label: 'Количество статей',
            defaultValue: 3,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'showViewAllLink',
            type: 'checkbox',
            label: 'Показать ссылку "Все статьи"',
            defaultValue: true,
            admin: {
                position: 'sidebar',
            },
        },
    ],
}
