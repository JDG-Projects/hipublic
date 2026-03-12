import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'tagline', type: 'text', required: true },
    { name: 'description', type: 'richText', required: true },
    {
      name: 'icon',
      type: 'text',
      admin: { description: 'Lucide icon name, e.g. "Megaphone"' },
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'feature', type: 'text' }],
    },
    {
      name: 'targetAudience',
      type: 'select',
      defaultValue: 'both',
      options: [
        { label: 'Brands / Media Buyers', value: 'brand' },
        { label: 'Influencers', value: 'influencer' },
        { label: 'Both', value: 'both' },
      ],
    },
  ],
}
