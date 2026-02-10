import type { Block } from 'payload'

export const ValuesBlock: Block = {
    slug: 'valuesBlock',
    interfaceName: 'ValuesBlock',
    labels: {
        singular: 'Блок ценностей',
        plural: 'Блоки ценностей',
    },
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            label: 'Заголовок',
            defaultValue: 'НАШИ ЦЕННОСТИ',
        },
        {
            name: 'subtitle',
            type: 'textarea',
            label: 'Подзаголовок',
        },
        {
            name: 'values',
            type: 'array',
            required: true,
            minRows: 2,
            maxRows: 6,
            label: 'Ценности',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    label: 'Название',
                },
                {
                    name: 'description',
                    type: 'textarea',
                    required: true,
                    label: 'Описание',
                },
                {
                    name: 'icon',
                    type: 'select',
                    label: 'Иконка',
                    options: [
                        { label: 'Щит', value: 'shield' },
                        { label: 'Награда', value: 'award' },
                        { label: 'Пользователи', value: 'users' },
                        { label: 'Рука', value: 'hand' },
                        { label: 'Звезда', value: 'star' },
                        { label: 'Чек', value: 'check' },
                    ],
                    defaultValue: 'shield',
                },
            ],
        },
    ],
}
