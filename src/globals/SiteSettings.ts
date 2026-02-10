import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
    slug: 'site-settings',
    admin: {
        group: 'Настройки',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'siteName',
            type: 'text',
            label: 'Название сайта',
            defaultValue: 'BUX&TAXES',
        },
        {
            name: 'siteDescription',
            type: 'textarea',
            label: 'Описание сайта',
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
            label: 'Логотип',
        },
        {
            name: 'phone',
            type: 'text',
            label: 'Телефон',
            required: true,
        },
        {
            name: 'phoneSecondary',
            type: 'text',
            label: 'Дополнительный телефон',
        },
        {
            name: 'email',
            type: 'text',
            label: 'Email',
        },
        {
            name: 'emailSupport',
            type: 'text',
            label: 'Email поддержки',
        },
        {
            name: 'address',
            type: 'textarea',
            label: 'Адрес',
        },
        {
            name: 'whatsapp',
            type: 'text',
            label: 'WhatsApp',
        },
        {
            name: 'telegram',
            type: 'text',
            label: 'Telegram',
        },
        {
            name: 'workingHours',
            type: 'text',
            label: 'Режим работы',
        },
        {
            name: 'mapEmbedUrl',
            type: 'text',
            label: 'URL карты (iframe)',
        },
        {
            name: 'socialLinks',
            type: 'array',
            label: 'Социальные сети',
            fields: [
                {
                    name: 'platform',
                    type: 'select',
                    label: 'Платформа',
                    options: [
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'Facebook', value: 'facebook' },
                        { label: 'VK', value: 'vk' },
                        { label: 'YouTube', value: 'youtube' },
                        { label: 'LinkedIn', value: 'linkedin' },
                    ],
                },
                {
                    name: 'url',
                    type: 'text',
                    label: 'Ссылка',
                },
            ],
        },
        {
            name: 'statsBar',
            type: 'group',
            label: 'Верхняя строка (статистика)',
            fields: [
                {
                    name: 'enabled',
                    type: 'checkbox',
                    label: 'Показать',
                    defaultValue: true,
                },
                {
                    name: 'items',
                    type: 'array',
                    label: 'Элементы',
                    fields: [
                        {
                            name: 'label',
                            type: 'text',
                            label: 'Подпись',
                        },
                        {
                            name: 'value',
                            type: 'text',
                            label: 'Значение',
                        },
                    ],
                },
            ],
        },
    ],
}
