import type { Block } from 'payload'

export const FAQBlock: Block = {
    slug: 'faqBlock',
    interfaceName: 'FAQBlock',
    labels: {
        singular: 'Блок FAQ',
        plural: 'Блоки FAQ',
    },
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            label: 'Заголовок',
            defaultValue: 'ЧАСТЫЕ ВОПРОСЫ',
        },
        {
            name: 'subtitle',
            type: 'textarea',
            label: 'Подзаголовок',
        },
        {
            name: 'source',
            type: 'radio',
            label: 'Источник вопросов',
            options: [
                { label: 'Из коллекции FAQ', value: 'collection' },
                { label: 'Ввести вручную', value: 'custom' },
            ],
            defaultValue: 'collection',
            admin: {
                layout: 'horizontal',
            },
        },
        {
            name: 'limit',
            type: 'number',
            label: 'Количество вопросов из коллекции',
            defaultValue: 5,
            admin: {
                condition: (data) => data?.source === 'collection',
            },
        },
        {
            name: 'customFaqs',
            type: 'array',
            label: 'Вопросы (вручную)',
            admin: {
                condition: (data) => data?.source === 'custom',
            },
            fields: [
                {
                    name: 'question',
                    type: 'text',
                    required: true,
                    label: 'Вопрос',
                },
                {
                    name: 'answer',
                    type: 'textarea',
                    required: true,
                    label: 'Ответ',
                },
            ],
        },
        {
            name: 'showContactCard',
            type: 'checkbox',
            label: 'Показать карточку контакта',
            defaultValue: true,
            admin: {
                position: 'sidebar',
            },
        },
    ],
}
