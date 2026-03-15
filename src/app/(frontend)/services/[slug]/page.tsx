import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 86400

export async function generateStaticParams() {
  try {
    const { getPayloadClient } = await import('@/lib/payload')
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'services', limit: 50 })
    return res.docs.map((s) => ({ slug: (s as { slug: string }).slug }))
  } catch {
    return []
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  type ServiceData = {
    title: string
    tagline: string
    features?: { feature: string }[]
    targetAudience?: string
  }
  let service: ServiceData | null = null

  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'services',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (res.docs.length > 0) service = res.docs[0] as unknown as ServiceData
  } catch {
    // fallback below
  }

  if (!service) {
    const fallbacks: Record<string, ServiceData> = {
      'influencer-marketing': {
        title: 'Influencer Marketing',
        tagline: 'Connect brands with the perfect creators',
        features: [
          { feature: 'Creator sourcing & vetting from our 10K+ network' },
          { feature: 'Campaign management from brief to delivery' },
          { feature: 'Content review & brand safety checks' },
          { feature: 'Performance tracking & reporting' },
          { feature: 'Multi-platform coverage (YouTube, TikTok, Instagram, Twitch)' },
        ],
        targetAudience: 'both',
      },
    }
    service = fallbacks[slug] ?? null
  }

  if (!service) notFound()

  return (
    <div className="pt-16">
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-purple-900/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Services
          </Link>
          <SectionWrapper>
            <h1 className="text-5xl sm:text-6xl font-black mb-4">{service.title}</h1>
            <p className="text-xl text-white/50 mb-8">{service.tagline}</p>
            {service.targetAudience && service.targetAudience !== 'both' && (
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-purple-600/20 border border-purple-500/30 text-purple-400">
                {service.targetAudience === 'brand' ? 'For Brands & Media Buyers' : 'For Influencers'}
              </span>
            )}
          </SectionWrapper>
        </div>
      </section>

      {service.features && service.features.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionWrapper>
              <h2 className="text-3xl font-black mb-8">What&apos;s Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((f) => (
                  <div key={f.feature} className="flex items-start gap-3 p-4 rounded-xl bg-white/3 border border-white/8">
                    <CheckCircle size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/70 text-sm">{f.feature}</span>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          </div>
        </section>
      )}

      <ContactCTA />
    </div>
  )
}
