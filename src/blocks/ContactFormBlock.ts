import type { Block } from 'payload'

export const ContactFormBlock: Block = {
    slug: 'contactFormBlock',
    interfaceName: 'ContactFormBlock',
    labels: {
        singular: 'Блок формы заявки',
        plural: 'Блоки форм заявок',
    },
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            label: 'Заголовок',
            defaultValue: 'ОСТАВЬТЕ ЗАЯВКУ',
        },
        {
            name: 'subtitle',
            type: 'textarea',
            label: 'Подзаголовок',
        },
        {
            name: 'successMessage',
            type: 'text',
            label: 'Сообщение об успешной отправке',
            defaultValue: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
        },
    ],
}
