/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from 'payload'
import config from './src/payload.config'

const seed = async () => {
  const payload = await getPayload({ config })

  console.log('Seeding globals...')

  // Seed SiteSettings
  const siteSettingsExists = await payload.findGlobal({
    slug: 'siteSettings',
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
          { label: 'Услуги', href: '/#services', type: 'link' },
          { label: 'Тарифы', href: '/#tariffs', type: 'link' },
          { label: 'Блог', href: '/blog', type: 'link' },
          { label: 'Калькуляторы', href: '/calculators', type: 'link' },
          { label: 'Контакты', href: '/contacts', type: 'link' },
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
    slug: 'footerConfig',
  }).catch(() => null)

  if (!footerExists) {
    await payload.updateGlobal({
      slug: 'footerConfig',
      data: {
        description: 'Профессиональное бухгалтерское сопровождение ИП и ТОО в Казахстане. Берем на себя отчёты и общение с налоговой.',
        linkColumns: [
          {
            title: 'Услуги',
            links: [
              { label: 'ИП', href: '/services/ip-bookkeeping' },
              { label: 'ТОО', href: '/services/too-bookkeeping' },
              { label: 'Отчетность', href: '/services/tax-reporting' },
              { label: 'Восстановление', href: '/services/recovery' },
            ],
          },
          {
            title: 'Информация',
            links: [
              { label: 'О нас', href: '/about' },
              { label: 'Блог', href: '/blog' },
              { label: 'Калькуляторы', href: '/calculators' },
              { label: 'Контакты', href: '/contacts' },
            ],
          },
          {
            title: 'Документы',
            links: [
              { label: 'Политика конфиденциальности', href: '/privacy' },
              { label: 'Договор оферты', href: '/offer' },
            ],
          },
        ],
        copyright: '© 2024 BUX&TAXES. Все права защищены.',
      },
    })
    console.log('FooterConfig created')
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
        data: cat as unknown as any,
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
        data: service as unknown as any,
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
        data: tariff as unknown as any,
      })
    }
  }

  console.log('Seeding FAQ...')
  const faqItems = [
    { question: 'Какие документы нужны для начала работы?', answer: 'Нам понадобится доступ к кабинету налогоплательщика (ЭЦП) и данные по вашим оборотам.', category: 'general', order: 1 },
    { question: 'Как передавать документы?', answer: 'Вы можете присылать фото или сканы документов через WhatsApp или Telegram.', category: 'general', order: 2 },
    { question: 'Сколько времени занимает сдача отчета?', answer: 'Обычно мы готовим отчет в течение 1 рабочего дня после получения всех данных.', category: 'taxes', order: 1 },
    { question: 'Что лучше: ИП или ТОО?', answer: 'Зависит от ваших целей, масштаба бизнеса и планируемых партнеров.', category: 'general', order: 3 },
    { question: 'Как долго длится процесс восстановления?', answer: 'Зависит от объема работ, обычно от 2 недель до 2 месяцев.', category: 'accounting', order: 1 },
  ]

  for (const faq of faqItems) {
    const existing = await payload.find({
      collection: 'faq',
      where: { question: { equals: faq.question } },
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'faq',
        data: faq as unknown as any,
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
        data: post as unknown as any,
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
            blockType: 'hero',
            heading: 'Профессиональная бухгалтерия для вашего бизнеса',
            subheading: 'Ведём учёт, налоги, ЭСФ и СНТ. Берём на себя отчёты и общение с налоговой.',
            showStats: true,
            ctaText: 'Получить консультацию',
            ctaLink: '/contacts',
            secondaryText: 'Узнать подробнее',
            secondaryLink: '/about',
          },
          {
            blockType: 'servicesOverview',
            heading: 'Наши услуги',
            subheading: 'Комплексное бухгалтерское сопровождение для ИП и ТОО',
            showLink: true,
            linkText: 'Все услуги',
            linkHref: '/#services',
          },
          {
            blockType: 'toolsPreview',
            heading: 'Калькуляторы',
            subheading: 'Рассчитайте стоимость услуг и налоги самостоятельно',
          },
          {
            blockType: 'tariffs',
            heading: 'Тарифы',
            subheading: 'Выберите оптимальный тариф для вашего бизнеса',
            showLink: true,
            linkText: 'Подробнее о тарифах',
            linkHref: '/tariffs',
          },
          {
            blockType: 'latestNews',
            heading: 'Новости и статьи',
            subheading: 'Полезная информация о бухгалтерии и налогах',
            showLink: true,
            linkText: 'Читать блог',
            linkHref: '/blog',
          },
          {
            blockType: 'quiz',
            heading: 'Не знаете какой тариф выбрать?',
            subheading: 'Ответьте на 3 вопроса и получите рекомендацию',
          },
          {
            blockType: 'clients',
            heading: 'Наши клиенты',
            subheading: 'Более 500 компаний доверяют нам свою бухгалтерию',
          },
          {
            blockType: 'faq',
            heading: 'Частые вопросы',
            subheading: 'Ответы на самые популярные вопросы о наших услугах',
            category: 'general',
          },
          {
            blockType: 'contactInfo',
            heading: 'Свяжитесь с нами',
            showMap: true,
          },
          {
            blockType: 'contactForm',
            heading: 'Остались вопросы?',
            subheading: 'Оставьте заявку и мы свяжемся с вами',
            successMessage: 'Спасибо за заявку! Мы свяжемся с вами в ближайшее время.',
          },
          {
            blockType: 'cta',
            heading: 'Готовы начать?',
            subheading: 'Оставьте заявку и получите бесплатную консультацию',
            buttonText: 'Оставить заявку',
            buttonLink: '/contacts',
            background: 'gradient',
          },
        ] as any,
        seo: {
          title: 'BUX&TAXES — бухгалтерия для ИП и ТОО в Казахстане',
          description: 'Ведём учёт, налоги, ЭСФ и СНТ. Берём на себя отчёты и общение с налоговой.',
        },
      } as unknown as any,
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
            blockType: 'hero',
            heading: 'О компании BUX&TAXES',
            subheading: 'Профессиональная команда бухгалтеров с опытом работы более 10 лет',
            showStats: false,
            ctaText: '',
            ctaLink: '',
          },
          {
            blockType: 'values',
            heading: 'Наши ценности',
            subheading: 'То, что делает нас лучшими в своем деле',
          },
          {
            blockType: 'richContent',
            content: {
              root: {
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: 'Компания BUX&TAXES основана в 2019 году группой профессиональных бухгалтеров и аудиторов.' }],
                  },
                ],
              },
            },
          },
          {
            blockType: 'clients',
            heading: 'Наши клиенты',
            subheading: 'Более 500 компаний доверяют нам',
          },
          {
            blockType: 'contactForm',
            heading: 'Хотите узнать больше?',
            subheading: 'Оставьте заявку и мы проведем экскурсию по нашим услугам',
            successMessage: 'Спасибо! Мы свяжемся с вами в ближайшее время.',
          },
        ] as any,
        seo: {
          title: 'О компании BUX&TAXES',
          description: 'Профессиональная бухгалтерская компания в Казахстане',
        },
      } as unknown as any,
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
            blockType: 'hero',
            heading: 'Контакты',
            subheading: 'Свяжитесь с нами удобным способом',
            showStats: false,
          },
          {
            blockType: 'contactInfo',
            heading: '',
            showMap: true,
          },
          {
            blockType: 'contactForm',
            heading: 'Остались вопросы?',
            subheading: 'Напишите нам и мы свяжемся с вами',
            successMessage: 'Спасибо за сообщение! Мы ответим в ближайшее время.',
          },
        ] as any,
        seo: {
          title: 'Контакты BUX&TAXES',
          description: 'Свяжитесь с нами: телефон, email, адрес',
        },
      } as unknown as any,
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
      } as unknown as any,
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
