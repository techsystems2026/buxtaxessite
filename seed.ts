/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from 'payload'
import config from './src/payload.config'

const seed = async () => {
  const payload = await getPayload({ config })

  console.log('Seeding services...')
  const services = [
    {
      title: 'Бухгалтерское сопровождение ИП',
      slug: 'ip-bookkeeping',
      h1: 'Профессиональное бухгалтерское сопровождение ИП в Казахстане',
      shortDescription: 'Полное ведение бухгалтерии для индивидуальных предпринимателей на всех режимах налогообложения. От сдачи отчетности до оптимизации налогов.',
      priceFrom: 'от 15 000 ₸',
      whatIsIncluded: [
        { item: 'Расчет налогов и взносов' },
        { item: 'Сдача формы 910.00 или 200.00' },
        { item: 'Ведение кадрового учета' },
        { item: 'Консультации по налогам' },
        { item: 'Контроль лимитов по доходам' },
        { item: 'Работа с кабинет налогоплательщика' }
      ],
      reports: [
        { report: '910.00' },
        { report: '200.00' },
        { report: '700.00' }
      ],
      responsibility: 'Мы несем полную материальную ответственность за правильность расчетов и своевременность сдачи отчетности. В случае штрафов по нашей вине — оплачиваем их сами.',
      faq: [
        { question: 'Какие документы нужны для начала работы?', answer: 'Нам понадобится доступ к кабинету налогоплательщика (ЭЦП) и данные по вашим оборотам (выписки из банков/каспи).' },
        { question: 'Как передавать документы?', answer: 'Вы можете присылать фото или сканы документов через WhatsApp или Telegram.' }
      ]
    },
    {
      title: 'Бухгалтерское сопровождение ТОО',
      slug: 'too-bookkeeping',
      h1: 'Комплексное бухгалтерское сопровождение ТОО',
      shortDescription: 'Профессиональный учет для товариществ с ограниченной ответственностью с НДС и без НДС. Берем на себя всю рутину.',
      priceFrom: 'от 40 000 ₸',
      whatIsIncluded: [
        { item: 'Ведение бухгалтерского и налогового учета' },
        { item: 'Расчет заработной платы сотрудников' },
        { item: 'Работа с ЭСФ и СНТ' },
        { item: 'Статистическая отчетность' },
        { item: 'Представление интересов в налоговых органах' }
      ],
      reports: [
        { report: '100.00' },
        { report: '300.00' },
        { report: '200.00' },
        { report: 'Статистика' }
      ],
      responsibility: 'Гарантируем отсутствие блокировок счетов и штрафов. Ответственность закреплена в договоре.',
      faq: [
        { question: 'Входит ли в стоимость расчет зарплаты?', answer: 'Да, расчет зарплаты до 5 сотрудников уже включен в базовую стоимость тарифа.' }
      ]
    },
    {
      title: 'Сдача налоговой отчетности',
      slug: 'tax-reporting',
      h1: 'Разовая сдача налоговой отчетности',
      shortDescription: 'Поможем подготовить и отправить налоговую отчетность без ошибок и точно в срок. Разовые услуги для тех, кто ведет учет сам.',
      priceFrom: 'от 10 000 ₸',
      whatIsIncluded: [
        { item: 'Проверка первичной документации' },
        { item: 'Расчет налоговых обязательств' },
        { item: 'Заполнение налоговой формы' },
        { item: 'Отправка через кабинет налогоплательщика' },
        { item: 'Предоставление уведомления о принятии' }
      ],
      reports: [
        { report: '910.00' },
        { report: '200.00' },
        { report: '300.00' },
        { report: '870.00' }
      ],
      responsibility: 'Несем ответственность за корректность заполнения данных в соответствии с предоставленными вами документами.',
      faq: [
        { question: 'Сколько времени занимает сдача отчета?', answer: 'Обычно мы готовим отчет в течение 1 рабочего дня после получения всех данных.' }
      ]
    }
  ]

  for (const service of services) {
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: service.slug } }
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'services',
        data: service as unknown as any // Bypass strict check for seed
      })
    }
  }

  console.log('Seeding tariffs...')
  const tariffs = [
    {
      name: 'ИП на упрощенке (без НДС)',
      category: 'IP',
      price: '15 000 ₸ / мес',
      features: [
        { feature: 'До 50 операций в месяц' },
        { feature: 'Сдача 910 формы' },
        { feature: 'Расчет налогов и взносов' },
        { feature: 'Консультации 24/7' }
      ],
      format: 'Удаленно',
      responsibility: 'Полная финансовая ответственность'
    },
    {
      name: 'ТОО на упрощенке (без НДС)',
      category: 'TOO_NO_VAT',
      price: '40 000 ₸ / мес',
      features: [
        { feature: 'До 100 операций в месяц' },
        { feature: 'Сдача всех форм (910, 200, 870)' },
        { feature: 'Кадровый учет (до 3 чел)' },
        { feature: 'ЭСФ / СНТ' }
      ],
      format: 'Удаленно + курьер',
      responsibility: 'Полная финансовая ответственность по договору'
    },
    {
      name: 'ТОО на общеустановленном (с НДС)',
      category: 'TOO_VAT',
      price: 'от 80 000 ₸ / мес',
      features: [
        { feature: 'Любое количество операций' },
        { feature: 'Сдача 300, 200, 100 форм' },
        { feature: 'Импорт / Экспорт' },
        { feature: 'Валютный контроль' }
      ],
      format: 'Персональный бухгалтер',
      responsibility: 'Комплексная юридическая и финансовая ответственность'
    }
  ]

  for (const tariff of tariffs) {
    const existing = await payload.find({
      collection: 'tariffs',
      where: { name: { equals: tariff.name } }
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'tariffs',
        data: tariff as unknown as any
      })
    }
  }

  console.log('Seeding blog posts...')
  const blogPosts = [
    {
      title: 'Изменения в налоговом кодексе 2025',
      slug: 'tax-changes-2025',
      excerpt: 'Разбираем основные поправки, которые коснутся малого и среднего бизнеса в Казахстане в новом году.',
      publishedAt: '2024-12-01',
      content: {
        root: {
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'В 2025 году предпринимателей Казахстана ждет ряд важных изменений. Основное внимание уделяется цифровизации и усилению контроля за наличными оборотами.' }]
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Новые ставки МРП и МЗП' }]
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'С 1 января 2025 года установлены новые показатели: МРП — 3 932 тенге, МЗП — 85 000 тенге. Это напрямую влияет на расчет налогов, штрафов и социальных платежей.' }]
            }
          ]
        }
      }
    },
    {
      title: 'Как ИП сдать 910 форму без штрафов',
      slug: 'form-910-guide',
      excerpt: 'Пошаговая инструкция по заполнению упрощенной декларации для индивидуальных предпринимателей.',
      publishedAt: '2024-11-15',
      content: {
        root: {
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Форма 910.00 — самая популярная среди малого бизнеса. Мы подготовили чек-лист, чтобы вы не допустили ошибок.' }]
            }
          ]
        }
      }
    }
  ]

  for (const post of blogPosts) {
    const existing = await payload.find({
      collection: 'blog',
      where: { slug: { equals: post.slug } }
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'blog',
        data: post as unknown as any
      })
    }
  }

  console.log('Seed completed successfully.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
