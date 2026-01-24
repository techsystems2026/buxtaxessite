import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'h1', type: 'text' },
    { name: 'shortDescription', type: 'textarea', required: true },
    { name: 'fullDescription', type: 'richText' },
    {
      name: 'whatIsIncluded',
      type: 'array',
      fields: [{ name: 'item', type: 'text' }],
    },
    {
      name: 'reports',
      type: 'array',
      fields: [{ name: 'report', type: 'text' }],
    },
    { name: 'responsibility', type: 'textarea' },
    { name: 'priceFrom', type: 'text' },
    {
      name: 'faq',
      type: 'array',
      fields: [
        { name: 'question', type: 'text' },
        { name: 'answer', type: 'textarea' },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}

export const Tariffs: CollectionConfig = {
  slug: 'tariffs',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'category', type: 'select', options: ['IP', 'TOO_NO_VAT', 'TOO_VAT'], required: true },
    { name: 'price', type: 'text', required: true },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'feature', type: 'text' }],
    },
    { name: 'format', type: 'text' },
    { name: 'responsibility', type: 'textarea' },
  ],
}

export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'excerpt', type: 'textarea' },
    { name: 'content', type: 'richText', required: true },
    { name: 'publishedAt', type: 'date', defaultValue: () => new Date() },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}

export const FAQ: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'question',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
  ],
}

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'text' },
    { name: 'message', type: 'textarea' },
    { name: 'source', type: 'text' },
    { name: 'status', type: 'select', options: ['new', 'contacted', 'closed'], defaultValue: 'new' },
  ],
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [],
}
