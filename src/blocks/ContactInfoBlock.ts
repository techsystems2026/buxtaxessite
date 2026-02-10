import type { Block } from 'payload'

export const ContactInfoBlock: Block = {
    slug: 'contactInfoBlock',
    interfaceName: 'ContactInfoBlock',
    labels: {
        singular: 'Блок контактов',
        plural: 'Блоки контактов',
    },
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            label: 'Заголовок',
            defaultValue: 'КОНТАКТЫ',
        },
        {
            name: 'subtitle',
            type: 'textarea',
            label: 'Подзаголовок',
        },
        {
            name: 'showMap',
            type: 'checkbox',
            label: 'Показать карту',
            defaultValue: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'mapEmbedUrl',
            type: 'text',
            label: 'URL карты (iframe)',
            admin: {
                condition: (data) => data?.showMap === true,
            },
        },
        {
            name: 'showFromSettings',
            type: 'checkbox',
            label: 'Использовать контакты из настроек сайта',
            defaultValue: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'customContacts',
            type: 'group',
            label: 'Контакты (вручную)',
            admin: {
                condition: (data) => data?.showFromSettings !== true,
            },
            fields: [
                {
                    name: 'address',
                    type: 'textarea',
                    label: 'Адрес',
                },
                {
                    name: 'phone',
                    type: 'text',
                    label: 'Телефон',
                },
                {
                    name: 'phoneSecondary',
                    type: 'text',
                    label: 'Доп. телефон',
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
                    name: 'workingHours',
                    type: 'text',
                    label: 'Режим работы',
                },
                {
                    name: 'whatsapp',
                    type: 'text',
                    label: 'WhatsApp',
                },
            ],
        },
    ],
}
