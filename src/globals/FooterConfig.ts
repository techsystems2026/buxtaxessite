import type { GlobalConfig } from 'payload'

export const FooterConfig: GlobalConfig = {
    slug: 'footer',
    admin: {
        group: 'Настройки',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'description',
            type: 'textarea',
            label: 'Описание в футере',
        },
        {
            name: 'columns',
            type: 'array',
            label: 'Колонки ссылок',
            minRows: 2,
            maxRows: 4,
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    label: 'Заголовок колонки',
                },
                {
                    name: 'links',
                    type: 'array',
                    label: 'Ссылки',
                    fields: [
                        {
                            name: 'label',
                            type: 'text',
                            required: true,
                            label: 'Текст ссылки',
                        },
                        {
                            name: 'url',
                            type: 'text',
                            required: true,
                            label: 'Ссылка',
                        },
                    ],
                },
            ],
        },
        {
            name: 'bottomText',
            type: 'text',
            label: 'Текст внизу',
            defaultValue: '© 2024 BUX&TAXES. Все права защищены.',
        },
        {
            name: 'showPoweredBy',
            type: 'checkbox',
            label: 'Показать "Работает на Payload CMS"',
            defaultValue: false,
        },
    ],
}
