import type { Block } from 'payload'

export const RichContentBlock: Block = {
    slug: 'richContentBlock',
    interfaceName: 'RichContentBlock',
    labels: {
        singular: 'Блок с текстом',
        plural: 'Блоки с текстом',
    },
    fields: [
        {
            name: 'content',
            type: 'richText',
            label: 'Содержание',
        },
        {
            name: 'backgroundColor',
            type: 'select',
            label: 'Цвет фона',
            options: [
                { label: 'Белый', value: 'white' },
                { label: 'Светло-серый', value: 'gray' },
                { label: 'Темный', value: 'dark' },
            ],
            defaultValue: 'white',
        },
    ],
}
