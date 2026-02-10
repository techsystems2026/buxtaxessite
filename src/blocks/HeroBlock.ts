import type { Block } from 'payload'

export const HeroBlock: Block = {
    slug: 'heroBlock',
    interfaceName: 'HeroBlock',
    labels: {
        singular: 'Hero секция',
        plural: 'Hero секции',
    },
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            label: 'Заголовок',
        },
        {
            name: 'highlightedWord',
            type: 'text',
            label: 'Выделенное слово (подсветка)',
            admin: {
                description: 'Слово в заголовке, которое будет выделено цветом',
            },
        },
        {
            name: 'subtitle',
            type: 'textarea',
            label: 'Подзаголовок',
        },
        {
            name: 'bulletPoints',
            type: 'array',
            label: 'Список преимуществ',
            fields: [
                {
                    name: 'point',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'stats',
            type: 'array',
            label: 'Статистика (блоки справа)',
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
                    name: 'isPrimary',
                    type: 'checkbox',
                    label: 'Выделить цветом',
                    defaultValue: false,
                },
            ],
        },
        {
            name: 'ctaButtons',
            type: 'array',
            label: 'Кнопки CTA',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    label: 'Текст кнопки',
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
                {
                    name: 'icon',
                    type: 'select',
                    label: 'Иконка',
                    options: [
                        { label: 'Нет', value: 'none' },
                        { label: 'WhatsApp', value: 'whatsapp' },
                        { label: 'Telegram', value: 'telegram' },
                        { label: 'Телефон', value: 'phone' },
                        { label: 'Стрелка', value: 'arrow' },
                    ],
                    defaultValue: 'none',
                },
            ],
        },
        {
            name: 'bottomCard',
            type: 'group',
            label: 'Карточка внизу справа',
            fields: [
                {
                    name: 'enabled',
                    type: 'checkbox',
                    label: 'Показать карточку',
                    defaultValue: true,
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'Заголовок',
                },
                {
                    name: 'subtitle',
                    type: 'text',
                    label: 'Подзаголовок',
                },
            ],
        },
    ],
}
