import type { Block } from 'payload'

export const ToolsPreviewBlock: Block = {
    slug: 'toolsPreviewBlock',
    interfaceName: 'ToolsPreviewBlock',
    labels: {
        singular: 'Блок инструментов',
        plural: 'Блоки инструментов',
    },
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            label: 'Заголовок',
            defaultValue: 'ПОЛЕЗНЫЕ ИНСТРУМЕНТЫ',
        },
        {
            name: 'subtitle',
            type: 'textarea',
            label: 'Подзаголовок',
        },
        {
            name: 'tools',
            type: 'array',
            required: true,
            minRows: 1,
            maxRows: 6,
            label: 'Инструменты',
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
                    name: 'href',
                    type: 'text',
                    required: true,
                    label: 'Ссылка',
                },
                {
                    name: 'icon',
                    type: 'select',
                    label: 'Иконка',
                    options: [
                        { label: 'Калькулятор', value: 'calculator' },
                        { label: 'Кошелек', value: 'wallet' },
                        { label: 'Здание', value: 'building' },
                        { label: 'Файл', value: 'file' },
                        { label: 'График', value: 'chart' },
                    ],
                    defaultValue: 'calculator',
                },
                {
                    name: 'color',
                    type: 'select',
                    label: 'Цвет',
                    options: [
                        { label: 'Синий', value: 'blue' },
                        { label: 'Зеленый', value: 'green' },
                        { label: 'Фиолетовый', value: 'purple' },
                        { label: 'Оранжевый', value: 'orange' },
                    ],
                    defaultValue: 'blue',
                },
            ],
        },
    ],
}
