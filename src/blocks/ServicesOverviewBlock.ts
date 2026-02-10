import type { Block } from 'payload'

export const ServicesOverviewBlock: Block = {
    slug: 'servicesOverviewBlock',
    interfaceName: 'ServicesOverviewBlock',
    labels: {
        singular: 'Блок услуг',
        plural: 'Блоки услуг',
    },
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            label: 'Заголовок',
            defaultValue: 'НАШИ УСЛУГИ',
        },
        {
            name: 'subtitle',
            type: 'textarea',
            label: 'Подзаголовок',
        },
        {
            name: 'showCount',
            type: 'number',
            label: 'Количество услуг для отображения',
            defaultValue: 6,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'fallbackServices',
            type: 'array',
            label: 'Услуги (если нет в базе)',
            admin: {
                condition: (data) => !data?.showCount || data.showCount === 0,
            },
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'slug',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'shortDescription',
                    type: 'textarea',
                    required: true,
                },
                {
                    name: 'priceFrom',
                    type: 'text',
                },
            ],
        },
        {
            name: 'showCta',
            type: 'checkbox',
            label: 'Показать кнопку "Все услуги"',
            defaultValue: true,
            admin: {
                position: 'sidebar',
            },
        },
    ],
}
