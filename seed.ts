/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from 'payload'
import config from './src/payload.config'

const seed = async () => {
  const payload = await getPayload({ config })

  console.log('Seeding globals...')

  // Seed SiteSettings
  const siteSettingsExists = await payload.findGlobal({
    slug: 'site-settings',
  }).catch(() => null)

  if (!siteSettingsExists) {
    await payload.updateGlobal({
      slug: 'siteSettings',
      data: {
        siteName: 'BUX&TAXES',
        siteDescription: 'Профессиональная бухгалтерия для ИП и ТОО в Казахстане',
        phone: '+7 (707) 123-45-67',
        email: 'info@buxtaxes.kz',
        address: 'г. Алматы, ул. Абая 123, офис 456',
        workingHours: 'Пн-Пт: 09:00 - 18:00',
        socialLinks: {
          instagram: 'https://instagram.com/buxtaxes',
          telegram: 'https://t.me/buxtaxes',
          whatsapp: 'https://wa.me/77071234567',
        },
        statsBar: {
          enabled: true,
          items: [
            { label: 'Лет на рынке', value: '5+' },
            { label: 'Клиентов', value: '500+' },
            { label: 'Лет гарантии', value: '3' },
          ],
        },
      },
    })
    console.log('SiteSettings created')
  }

  // Seed Navigation
  const navExists = await payload.findGlobal({
    slug: 'navigation',
  }).catch(() => null)

  if (!navExists) {
    await payload.updateGlobal({
      slug: 'navigation',
      data: {
        items: [
          { label: 'Услуги', href: '/#services' },
          { label: 'Тарифы', href: '/tariffs' },
          { label: 'Блог', href: '/blog' },
          { label: 'Калькуляторы', href: '/calculators' },
          { label: 'Контакты', href: '/contacts' },
        ],
        ctaButton: {
          text: 'Получить консультацию',
          href: '/contacts',
        },
      },
    })
    console.log('Navigation created')
  }

  // Seed FooterConfig
  const footerExists = await payload.findGlobal({
    slug: 'footer',
  }).catch(() => null)

  if (!footerExists) {
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        description: 'Профессиональное бухгалтерское сопровождение ИП и ТОО в Казахстане. Берем на себя отчёты и общение с налоговой.',
        columns: [
          {
            title: 'Услуги',
            links: [
              { label: 'ИП', url: '/services/ip-bookkeeping' },
              { label: 'ТОО', url: '/services/too-bookkeeping' },
              { label: 'Отчетность', url: '/services/tax-reporting' },
              { label: 'Восстановление', url: '/services/recovery' },
            ],
          },
          {
            title: 'Информация',
            links: [
              { label: 'О нас', url: '/about' },
              { label: 'Блог', url: '/blog' },
              { label: 'Калькуляторы', url: '/calculators' },
              { label: 'Контакты', url: '/contacts' },
            ],
          },
          {
            title: 'Документы',
            links: [
              { label: 'Политика конфиденциальности', url: '/privacy' },
              { label: 'Договор оферты', url: '/offer' },
            ],
          },
        ],
        bottomText: '© 2024 BUX&TAXES. Все права защищены.',
      },
    })
    console.log('Footer created')
  }

  console.log('Seeding categories...')
  const categories = [
    { name: 'Налоги', slug: 'taxes' },
    { name: 'Бухгалтерия', slug: 'accounting' },
    { name: 'Кадры', slug: 'hr' },
    { name: 'Новости законодательства', slug: 'legislation' },
  ]

  for (const cat of categories) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'categories',
        data: cat as any,
      })
    }
  }

  console.log('Seeding services...')
  const services = [
    {
      title: 'Бухгалтерское сопровождение ИП',
      slug: 'ip-bookkeeping',
      h1: 'Профессиональное бухгалтерское сопровождение ИП в Казахстане',
      icon: 'briefcase',
      shortDescription: 'Полное ведение бухгалтерии для индивидуальных предпринимателей на всех режимах налогообложения.',
      priceFrom: 'от 15 000 ₸',
      whatIsIncluded: [
        { item: 'Расчет налогов и взносов' },
        { item: 'Сдача формы 910.00 или 200.00' },
        { item: 'Ведение кадрового учета' },
        { item: 'Консультации по налогам' },
      ],
      reports: [
        { report: '910.00' },
        { report: '200.00' },
        { report: '700.00' },
      ],
      responsibility: 'Мы несем полную материальную ответственность за правильность расчетов.',
    },
    {
      title: 'Бухгалтерское сопровождение ТОО',
      slug: 'too-bookkeeping',
      h1: 'Комплексное бухгалтерское сопровождение ТОО',
      icon: 'building',
      shortDescription: 'Профессиональный учет для товариществ с ограниченной ответственностью.',
      priceFrom: 'от 40 000 ₸',
      whatIsIncluded: [
        { item: 'Ведение бухгалтерского и налогового учета' },
        { item: 'Расчет заработной платы' },
        { item: 'Работа с ЭСФ и СНТ' },
        { item: 'Представление интересов в налоговых' },
      ],
      reports: [
        { report: '100.00' },
        { report: '300.00' },
        { report: '200.00' },
      ],
      responsibility: 'Гарантируем отсутствие блокировок счетов и штрафов.',
    },
    {
      title: 'Сдача налоговой отчетности',
      slug: 'tax-reporting',
      h1: 'Разовая сдача налоговой отчетности',
      icon: 'file-text',
      shortDescription: 'Подготовка и отправка налоговой отчетности без ошибок.',
      priceFrom: 'от 10 000 ₸',
      whatIsIncluded: [
        { item: 'Проверка первичной документации' },
        { item: 'Расчет налоговых обязательств' },
        { item: 'Заполнение налоговой формы' },
      ],
      reports: [
        { report: '910.00' },
        { report: '200.00' },
        { report: '300.00' },
      ],
      responsibility: 'Несем ответственность за корректность заполнения данных.',
    },
    {
      title: 'Восстановление бухгалтерского учета',
      slug: 'recovery',
      h1: 'Восстановление бухгалтерского и налогового учета',
      icon: 'calculator',
      shortDescription: 'Приведем вашу бухгалтерию в порядок и исправим ошибки прошлых периодов.',
      priceFrom: 'от 50 000 ₸',
      whoLeadsAccount: 'Старший аудитор',
      whatIsIncluded: [
        { item: 'Аудит текущего состояния учета' },
        { item: 'Восстановление первичной документации' },
        { item: 'Корректировка налоговой отчетности' },
      ],
      reports: [
        { report: 'Все формы за период' },
      ],
      responsibility: 'Гарантируем корректность восстановленных данных.',
    },
  ]

  for (const service of services) {
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: service.slug } },
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'services',
        data: service as any,
      })
    }
  }

  console.log('Seeding tariffs...')
  const tariffs = [
    {
      name: 'ИП на упрощенке',
      category: 'IP',
      price: '15 000 ₸ / мес',
      features: [
        { feature: 'До 50 операций в месяц' },
        { feature: 'Сдача 910 формы' },
        { feature: 'Расчет налогов' },
        { feature: 'Консультации 24/7' },
      ],
      format: 'Удаленно',
      responsibility: 'Полная финансовая ответственность',
      isPopular: false,
    },
    {
      name: 'ТОО без НДС',
      category: 'TOO_NO_VAT',
      price: '40 000 ₸ / мес',
      features: [
        { feature: 'До 100 операций' },
        { feature: 'Сдача всех форм' },
        { feature: 'Кадровый учет до 3 чел' },
        { feature: 'ЭСФ / СНТ' },
      ],
      format: 'Удаленно + курьер',
      responsibility: 'Полная финансовая ответственность',
      isPopular: true,
    },
    {
      name: 'ТОО с НДС',
      category: 'TOO_VAT',
      price: 'от 80 000 ₸ / мес',
      features: [
        { feature: 'Любое количество операций' },
        { feature: 'Сдача 300, 200, 100 форм' },
        { feature: 'Импорт / Экспорт' },
        { feature: 'Валютный контроль' },
      ],
      format: 'Персональный бухгалтер',
      responsibility: 'Комплексная ответственность',
      isPopular: false,
    },
  ]

  for (const tariff of tariffs) {
    const existing = await payload.find({
      collection: 'tariffs',
      where: { name: { equals: tariff.name } },
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'tariffs',
        data: tariff as any,
      })
    }
  }

  console.log('Seeding blog posts...')
  const blogPosts = [
    {
      title: 'Изменения в налоговом кодексе 2025',
      slug: 'tax-changes-2025',
      excerpt: 'Разбираем основные поправки, которые коснутся малого и среднего бизнеса в Казахстане.',
      publishedAt: '2024-12-01',
      content: {
        root: {
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'В 2025 году предпринимателей ждет ряд важных изменений.' }],
            },
          ],
        },
      },
      isFeatured: true,
    },
    {
      title: 'Как ИП сдать 910 форму без штрафов',
      slug: 'form-910-guide',
      excerpt: 'Пошаговая инструкция по заполнению упрощенной декларации.',
      publishedAt: '2024-11-15',
      content: {
        root: {
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Форма 910.00 — самая популярная среди малого бизнеса.' }],
            },
          ],
        },
      },
      isFeatured: false,
    },
  ]

  for (const post of blogPosts) {
    const existing = await payload.find({
      collection: 'blog',
      where: { slug: { equals: post.slug } },
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'blog',
        data: post as any,
      })
    }
  }

  console.log('Seeding pages with blocks...')

  // Create home page with blocks
  const homePageExists = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
  })

  if (homePageExists.docs.length === 0) {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Главная страница',
        slug: 'home',
        layout: [
          {
            blockType: 'heroBlock',
            heading: 'Профессиональная бухгалтерия для вашего бизнеса',
            highlightedWord: 'бухгалтерия',
            subtitle: 'Ведём учёт, налоги, ЭСФ и СНТ. Берём на себя отчёты и общение с налоговой.',
            bulletPoints: [
              { point: 'Гарантия отсутствия штрафов' },
              { point: 'Опытные бухгалтеры (10+ лет)' },
              { point: 'Поддержка 24/7' },
            ],
            stats: [
              { value: '5+', label: 'Лет на рынке', isPrimary: true },
              { value: '500+', label: 'Клиентов', isPrimary: false },
            ],
            ctaButtons: [
              { label: 'Заказать консультацию', url: '/contacts', variant: 'primary' },
              { label: 'Посмотреть услуги', url: '/#services', variant: 'outline' },
            ],
          },
          {
            blockType: 'servicesOverviewBlock',
            heading: 'Наши услуги',
            subtitle: 'Комплексное бухгалтерское сопровождение для ИП и ТОО',
          },
          {
            blockType: 'toolsPreviewBlock',
            heading: 'Калькуляторы',
            subtitle: 'Рассчитайте стоимость услуг и налоги самостоятельно',
          },
          {
            blockType: 'tariffsBlock',
            heading: 'Тарифы',
            subtitle: 'Выберите оптимальный тариф для вашего бизнеса',
          },
          {
            blockType: 'latestNewsBlock',
            heading: 'Новости и статьи',
            subtitle: 'Полезная информация о бухгалтерии и налогах',
          },
          {
            blockType: 'quizBlock',
            heading: 'Не знаете какой тариф выбрать?',
            subtitle: 'Ответьте на несколько вопросов и получите рекомендацию',
          },
          {
            blockType: 'clientsBlock',
            heading: 'Наши клиенты',
            subtitle: 'Более 500 компаний доверяют нам свою бухгалтерию',
          },
          {
            blockType: 'faqBlock',
            heading: 'Частые вопросы',
            subtitle: 'Ответы на самые популярные вопросы',
          },
          {
            blockType: 'contactInfoBlock',
            heading: 'Свяжитесь с нами',
          },
          {
            blockType: 'contactFormBlock',
            heading: 'Остались вопросы?',
            subtitle: 'Оставьте заявку и мы свяжемся с вами в ближайшее время',
            successMessage: 'Спасибо за заявку!',
          },
          {
            blockType: 'ctaBlock',
            heading: 'Готовы начать?',
            subtitle: 'Оставьте заявку и получите бесплатную консультацию',
            buttonLabel: 'Оставить заявку',
            buttonUrl: '/contacts',
          },
        ] as any,
        seo: {
          title: 'BUX&TAXES — бухгалтерия для ИП и ТОО в Казахстане',
          description: 'Ведём учёт, налоги, ЭСФ и СНТ. Берём на себя отчёты и общение с налоговой.',
        },
      } as any,
    })
    console.log('Home page created')
  }

  // Create about page
  const aboutPageExists = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
  })

  if (aboutPageExists.docs.length === 0) {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'О компании',
        slug: 'about',
        layout: [
          {
            blockType: 'heroBlock',
            heading: 'О компании BUX&TAXES',
            subtitle: 'Профессиональная команда бухгалтеров с опытом работы более 10 лет',
          },
          {
            blockType: 'valuesBlock',
            heading: 'Наши ценности',
            subtitle: 'То, что делает нас лучшими в своем деле',
          },
          {
            blockType: 'richContentBlock',
            content: {
              root: {
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: 'Компания BUX&TAXES основана профессиональными бухгалтерами и аудиторами.' }],
                  },
                ],
              },
            },
          },
          {
            blockType: 'clientsBlock',
            heading: 'Наши клиенты',
          },
          {
            blockType: 'contactFormBlock',
            heading: 'Хотите узнать больше?',
            subtitle: 'Оставьте заявку и мы ответим на все вопросы',
          },
        ] as any,
        seo: {
          title: 'О компании BUX&TAXES',
          description: 'Профессиональная бухгалтерская компания в Казахстане',
        },
      } as any,
    })
    console.log('About page created')
  }

  // Create contacts page
  const contactsPageExists = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contacts' } },
  })

  if (contactsPageExists.docs.length === 0) {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Контакты',
        slug: 'contacts',
        layout: [
          {
            blockType: 'heroBlock',
            heading: 'Контакты',
            subtitle: 'Свяжитесь с нами удобным способом',
          },
          {
            blockType: 'contactInfoBlock',
          },
          {
            blockType: 'contactFormBlock',
            heading: 'Напишите нам',
            subtitle: 'Мы ответим в ближайшее время',
          },
        ] as any,
        seo: {
          title: 'Контакты BUX&TAXES',
          description: 'Свяжитесь с нами: телефон, email, адрес',
        },
      } as any,
    })
    console.log('Contacts page created')
  }

  console.log('Seeding admin user...')
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@buxtaxes.kz',
        password: 'admin123',
        role: 'admin',
      } as any,
    })
    console.log('Admin user created: admin@buxtaxes.kz / admin123')
  } else {
    console.log('Admin user already exists.')
  }

  console.log('Seed completed successfully.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
