import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: () => true },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'HiPublic' },
    { name: 'tagline', type: 'text', defaultValue: 'FROM NOW TO WOW' },
    { name: 'description', type: 'textarea' },
    { name: 'logoLight', type: 'upload', relationTo: 'media' },
    { name: 'logoDark', type: 'upload', relationTo: 'media' },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'telegram', type: 'text' },
        { name: 'youtube', type: 'text' },
      ],
    },
    {
      name: 'footerLinks',
      type: 'relationship',
      relationTo: 'pages',
      hasMany: true,
      maxRows: 4,
      admin: {
        description: 'Select up to 4 pages to display in the footer',
      },
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'value', type: 'text' },
        { name: 'label', type: 'text' },
      ],
      defaultValue: [
        { value: '500+', label: 'Campaigns' },
        { value: '10K+', label: 'Influencers' },
        { value: '50+', label: 'Countries' },
        { value: '98%', label: 'Client Satisfaction' },
      ],
    },
  ],
}
