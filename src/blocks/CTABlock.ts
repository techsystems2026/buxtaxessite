import type { Block } from 'payload'

export const CTABlock: Block = {
    slug: 'ctaBlock',
    interfaceName: 'CTABlock',
    labels: {
        singular: 'Блок CTA',
        plural: 'Блоки CTA',
    },
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            label: 'Заголовок',
        },
        {
            name: 'subtitle',
            type: 'textarea',
            label: 'Подзаголовок',
        },
        {
            name: 'buttons',
            type: 'array',
            label: 'Кнопки',
            maxRows: 2,
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    label: 'Текст',
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                    label: 'Ссылка',
                },
                {
                    name: 'variant',
                    type: 'select',
                    label: 'Вариант',
                    options: [
                        { label: 'Основная', value: 'primary' },
                        { label: 'Вторичная', value: 'secondary' },
                        { label: 'Контурная', value: 'outline' },
                    ],
                    defaultValue: 'primary',
                },
            ],
        },
        {
            name: 'backgroundColor',
            type: 'select',
            label: 'Цвет фона',
            options: [
                { label: 'Основной (синий)', value: 'primary' },
                { label: 'Темный', value: 'dark' },
                { label: 'Светлый', value: 'light' },
            ],
            defaultValue: 'primary',
        },
    ],
}
