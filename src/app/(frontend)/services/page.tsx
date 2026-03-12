import React from 'react'
import Link from 'next/link'
import { ArrowRight, Megaphone, BarChart3, Target, Users, Zap, Globe } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientBorder } from '@/components/ui/GradientBorder'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { GradientText } from '@/components/ui/AnimatedText'
import { getPayloadClient } from '@/lib/payload'

export const metadata = {
  title: 'Services — HiPublic',
  description: 'Full-service influencer marketing: strategy, execution, analytics, and global creator network.',
}

export const revalidate = 3600

const iconMap: Record<string, React.ReactNode> = {
  Megaphone: <Megaphone size={28} />,
  BarChart3: <BarChart3 size={28} />,
  Target: <Target size={28} />,
  Users: <Users size={28} />,
  Zap: <Zap size={28} />,
  Globe: <Globe size={28} />,
}

const fallback = [
  { id: '1', title: 'Influencer Marketing', slug: 'influencer-marketing', tagline: 'Connect brands with the perfect creators', icon: 'Megaphone', features: [{ feature: 'Creator sourcing & vetting' }, { feature: 'Campaign management' }, { feature: 'Content review' }] },
  { id: '2', title: 'Campaign Strategy', slug: 'campaign-strategy', tagline: 'Data-driven campaign planning', icon: 'Target', features: [{ feature: 'Audience analysis' }, { feature: 'KPI setting' }, { feature: 'Competitive research' }] },
  { id: '3', title: 'Performance Analytics', slug: 'performance-analytics', tagline: 'Real-time ROI tracking & optimization', icon: 'BarChart3', features: [{ feature: 'Live dashboards' }, { feature: 'A/B testing' }, { feature: 'Report generation' }] },
  { id: '4', title: 'Creator Network', slug: 'creator-network', tagline: '10,000+ vetted creators worldwide', icon: 'Users', features: [{ feature: 'Multi-platform coverage' }, { feature: 'Micro to mega influencers' }, { feature: 'Verified audiences' }] },
  { id: '5', title: 'Content Production', slug: 'content-production', tagline: 'Studio-quality creative content', icon: 'Zap', features: [{ feature: 'Video & photo production' }, { feature: 'Brand guidelines adherence' }, { feature: 'Multi-format delivery' }] },
  { id: '6', title: 'Global Reach', slug: 'global-reach', tagline: '50+ countries covered', icon: 'Globe', features: [{ feature: 'Multi-language campaigns' }, { feature: 'Local market expertise' }, { feature: 'Cross-border analytics' }] },
]

export default async function ServicesPage() {
  let services = fallback

  try {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'services', limit: 20, sort: 'order' })
    if (res.docs.length > 0) services = res.docs as typeof fallback
  } catch {
    // use fallback
  }

  return (
    <div className="pt-16">
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionWrapper>
            <span className="text-sm font-semibold text-purple-400 tracking-widest uppercase mb-4 block">
              Our Services
            </span>
            <h1 className="text-5xl sm:text-6xl font-black mb-6">
              Everything You Need to{' '}
              <GradientText>Dominate</GradientText>
            </h1>
            <p className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed">
              From strategy to execution, we provide end-to-end influencer marketing services
              that deliver measurable results.
            </p>
          </SectionWrapper>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <SectionWrapper key={service.id} delay={i * 0.07}>
                <GradientBorder>
                  <div className="p-8 flex flex-col gap-5 h-full">
                    <div className="w-14 h-14 rounded-xl bg-linear-to-br from-purple-600/30 to-cyan-500/20 flex items-center justify-center text-purple-400 border border-purple-500/20">
                      {iconMap[service.icon ?? 'Megaphone'] ?? <Megaphone size={28} />}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white mb-2">{service.title}</h2>
                      <p className="text-white/50 text-sm mb-4">{service.tagline}</p>
                      {service.features && service.features.length > 0 && (
                        <ul className="flex flex-col gap-2">
                          {service.features.map((f) => (
                            <li key={f.feature} className="flex items-center gap-2 text-sm text-white/60">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                              {f.feature}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-auto flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors group"
                    >
                      Learn more
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </GradientBorder>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  )
}
