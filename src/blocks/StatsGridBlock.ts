import type { Block } from 'payload'

export const StatsGridBlock: Block = {
    slug: 'statsGridBlock',
    interfaceName: 'StatsGridBlock',
    labels: {
        singular: 'Блок статистики',
        plural: 'Блоки статистики',
    },
    fields: [
        {
            name: 'stats',
            type: 'array',
            required: true,
            minRows: 1,
            maxRows: 8,
            label: 'Статистика',
            fields: [
                {
                    name: 'value',
                    type: 'text',
                    required: true,
                    label: 'Значение',
                },
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    label: 'Подпись',
                },
                {
                    name: 'icon',
                    type: 'select',
                    label: 'Иконка',
                    options: [
                        { label: 'Портфель', value: 'briefcase' },
                        { label: 'Пользователи', value: 'users' },
                        { label: 'Файл', value: 'file' },
                        { label: 'Часы', value: 'clock' },
                        { label: 'Звезда', value: 'star' },
                        { label: 'Щит', value: 'shield' },
                    ],
                    defaultValue: 'briefcase',
                },
                {
                    name: 'isPrimary',
                    type: 'checkbox',
                    label: 'Выделить цветом',
                    defaultValue: false,
                },
            ],
        },
    ],
}
