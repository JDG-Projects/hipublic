import React from 'react'
import { getPayloadClient } from '@/lib/payload'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { StatsSection } from '@/components/sections/StatsSection'
import { PartnersMarquee } from '@/components/sections/PartnersMarquee'
import { BlogPreviewSection } from '@/components/sections/BlogPreviewSection'
import { ContactCTA } from '@/components/sections/ContactCTA'

export const revalidate = 3600

export default async function HomePage() {
  let services: Parameters<typeof ServicesGrid>[0]['services'] = []
  let posts: Parameters<typeof BlogPreviewSection>[0]['posts'] = []
  let partners: Parameters<typeof PartnersMarquee>[0]['partners'] = []
  let stats: Parameters<typeof StatsSection>[0]['stats'] = undefined

  try {
    const payload = await getPayloadClient()

    const [servicesRes, postsRes, partnersRes, settingsRes] = await Promise.all([
      payload.find({ collection: 'services', limit: 6, sort: 'order' }),
      payload.find({
        collection: 'posts',
        limit: 3,
        sort: '-publishedAt',
        where: { status: { equals: 'published' } },
      }),
      payload.find({ collection: 'partners', limit: 20, sort: 'order' }),
      payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
    ])

    services = servicesRes.docs as Parameters<typeof ServicesGrid>[0]['services']
    posts = postsRes.docs as Parameters<typeof BlogPreviewSection>[0]['posts']
    partners = partnersRes.docs as Parameters<typeof PartnersMarquee>[0]['partners']

    if (settingsRes) {
      const s = settingsRes as { stats?: { value: string; label: string }[] }
      stats = s.stats
    }
  } catch {
    // DB not connected — use fallback data from components
  }

  return (
    <>
      <HeroSection />
      <StatsSection stats={stats} />
      <PartnersMarquee partners={partners} />
      <ServicesGrid services={services} />
      <BlogPreviewSection posts={posts} />
      <ContactCTA />
    </>
  )
}
