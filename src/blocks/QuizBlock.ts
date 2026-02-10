import type { Block } from 'payload'

export const QuizBlock: Block = {
    slug: 'quizBlock',
    interfaceName: 'QuizBlock',
    labels: {
        singular: 'Блок квиза',
        plural: 'Блоки квизов',
    },
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            label: 'Заголовок',
            defaultValue: 'ОТВЕТЬТЕ НА 4 ВОПРОСА',
        },
        {
            name: 'subtitle',
            type: 'textarea',
            label: 'Подзаголовок',
        },
        {
            name: 'steps',
            type: 'array',
            label: 'Шаги квиза',
            minRows: 1,
            maxRows: 10,
            fields: [
                {
                    name: 'id',
                    type: 'text',
                    required: true,
                    label: 'ID шага',
                },
                {
                    name: 'question',
                    type: 'text',
                    required: true,
                    label: 'Вопрос',
                },
                {
                    name: 'options',
                    type: 'array',
                    required: true,
                    label: 'Варианты ответа',
                    fields: [
                        {
                            name: 'label',
                            type: 'text',
                            required: true,
                            label: 'Текст варианта',
                        },
                    ],
                },
            ],
        },
        {
            name: 'completionHeading',
            type: 'text',
            label: 'Заголовок завершения',
            defaultValue: 'ОТЛИЧНО! МЫ ПОЧТИ ЗАКОНЧИЛИ',
        },
        {
            name: 'completionMessage',
            type: 'textarea',
            label: 'Сообщение после завершения',
            defaultValue: 'Оставьте ваши контакты, и мы подготовим для вас индивидуальное предложение по расчету стоимости в течение 15 минут.',
        },
    ],
}
