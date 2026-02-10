import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
    slug: 'navigation',
    admin: {
        group: 'Настройки',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'items',
            type: 'array',
            label: 'Пункты меню',
            minRows: 1,
            maxRows: 10,
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    label: 'Название',
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                    label: 'Ссылка',
                },
                {
                    name: 'openInNewTab',
                    type: 'checkbox',
                    label: 'Открывать в новой вкладке',
                    defaultValue: false,
                },
            ],
        },
        {
            name: 'ctaButton',
            type: 'group',
            label: 'CTA кнопка в меню',
            fields: [
                {
                    name: 'enabled',
                    type: 'checkbox',
                    label: 'Показать кнопку',
                    defaultValue: true,
                },
                {
                    name: 'label',
                    type: 'text',
                    label: 'Текст кнопки',
                    defaultValue: 'Заказать звонок',
                },
                {
                    name: 'url',
                    type: 'text',
                    label: 'Ссылка',
                    defaultValue: '/contacts',
                },
            ],
        },
    ],
}
