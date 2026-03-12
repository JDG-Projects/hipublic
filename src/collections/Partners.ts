import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
    { name: 'website', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 0 },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'iGaming', value: 'igaming' },
        { label: 'E-Commerce', value: 'ecommerce' },
        { label: 'Finance', value: 'finance' },
        { label: 'Other', value: 'other' },
      ],
    },
  ],
}
