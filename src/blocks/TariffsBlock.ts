import type { Block } from 'payload'

export const TariffsBlock: Block = {
    slug: 'tariffsBlock',
    interfaceName: 'TariffsBlock',
    labels: {
        singular: 'Блок тарифов',
        plural: 'Блоки тарифов',
    },
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            label: 'Заголовок',
            defaultValue: 'ТАРИФЫ НА ОБСЛУЖИВАНИЕ',
        },
        {
            name: 'subtitle',
            type: 'textarea',
            label: 'Подзаголовок',
        },
        {
            name: 'showFromCollection',
            type: 'checkbox',
            label: 'Показывать из коллекции Tariffs',
            defaultValue: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'categories',
            type: 'array',
            label: 'Категории тарифов',
            admin: {
                condition: (data) => data?.showFromCollection !== true,
            },
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                    label: 'Название категории',
                },
                {
                    name: 'tariffs',
                    type: 'array',
                    required: true,
                    label: 'Тарифы',
                    fields: [
                        {
                            name: 'name',
                            type: 'text',
                            required: true,
                            label: 'Название',
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
                    ],
                },
            ],
        },
        {
            name: 'showContactCta',
            type: 'checkbox',
            label: 'Показать CTA "Не нашли тариф"',
            defaultValue: true,
            admin: {
                position: 'sidebar',
            },
        },
    ],
}
