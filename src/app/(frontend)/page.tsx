import React, { Suspense } from 'react'
import { getPayloadClient } from '@/lib/payload'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { StatsSection } from '@/components/sections/StatsSection'
import { PartnersMarquee } from '@/components/sections/PartnersMarquee'
import { BlogPreviewSection } from '@/components/sections/BlogPreviewSection'
import { ContactCTA } from '@/components/sections/ContactCTA'

export const revalidate = 3600

async function StatsLoader() {
  try {
    const payload = await getPayloadClient()
    const settings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)
    const stats = settings
      ? (settings as { stats?: { value: string; label: string }[] }).stats
      : undefined
    return <StatsSection stats={stats} />
  } catch {
    return <StatsSection />
  }
}

async function PartnersLoader() {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'partners', limit: 20, sort: 'order' })
    return <PartnersMarquee partners={res.docs as Parameters<typeof PartnersMarquee>[0]['partners']} />
  } catch {
    return <PartnersMarquee />
  }
}

async function ServicesLoader() {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'services', limit: 6, sort: 'order' })
    return <ServicesGrid services={res.docs as Parameters<typeof ServicesGrid>[0]['services']} />
  } catch {
    return <ServicesGrid services={[]} />
  }
}

async function BlogLoader() {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'posts',
      limit: 3,
      sort: '-publishedAt',
      where: { status: { equals: 'published' } },
    })
    return <BlogPreviewSection posts={res.docs as Parameters<typeof BlogPreviewSection>[0]['posts']} />
  } catch {
    return <BlogPreviewSection />
  }
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<StatsSection />}>
        <StatsLoader />
      </Suspense>
      <Suspense fallback={<PartnersMarquee />}>
        <PartnersLoader />
      </Suspense>
      <Suspense fallback={<ServicesGrid services={[]} />}>
        <ServicesLoader />
      </Suspense>
      <Suspense fallback={<BlogPreviewSection />}>
        <BlogLoader />
      </Suspense>
      <ContactCTA />
    </>
  )
}
