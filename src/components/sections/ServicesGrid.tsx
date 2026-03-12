'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Megaphone, BarChart3, Target, Users, Zap, Globe } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientBorder } from '@/components/ui/GradientBorder'

const iconMap: Record<string, React.ReactNode> = {
  Megaphone: <Megaphone size={24} />,
  BarChart3: <BarChart3 size={24} />,
  Target: <Target size={24} />,
  Users: <Users size={24} />,
  Zap: <Zap size={24} />,
  Globe: <Globe size={24} />,
}

interface Service {
  id: string
  title: string
  slug: string
  tagline: string
  icon?: string
}

interface ServicesGridProps {
  services: Service[]
}

const fallbackServices = [
  { id: '1', title: 'Influencer Marketing', slug: 'influencer-marketing', tagline: 'Connect brands with creators', icon: 'Megaphone' },
  { id: '2', title: 'Campaign Strategy', slug: 'campaign-strategy', tagline: 'Data-driven campaign planning', icon: 'Target' },
  { id: '3', title: 'Performance Analytics', slug: 'performance-analytics', tagline: 'Real-time ROI tracking', icon: 'BarChart3' },
  { id: '4', title: 'Creator Network', slug: 'creator-network', tagline: '10,000+ vetted creators', icon: 'Users' },
  { id: '5', title: 'Content Production', slug: 'content-production', tagline: 'Studio-quality content', icon: 'Zap' },
  { id: '6', title: 'Global Reach', slug: 'global-reach', tagline: '50+ countries covered', icon: 'Globe' },
]

export function ServicesGrid({ services }: ServicesGridProps) {
  const items = services.length > 0 ? services : fallbackServices

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionWrapper className="text-center mb-16">
          <span className="text-sm font-semibold text-purple-400 tracking-widest uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Full-Service{' '}
            <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Influencer Marketing
            </span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            From strategy to execution, we handle every aspect of your influencer marketing campaigns.
          </p>
        </SectionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((service, i) => (
            <SectionWrapper key={service.id} delay={i * 0.08}>
              <GradientBorder>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-6 h-full flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-600/30 to-cyan-500/20 flex items-center justify-center text-purple-400 border border-purple-500/20">
                    {iconMap[service.icon ?? 'Megaphone'] ?? <Megaphone size={24} />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{service.title}</h3>
                    <p className="text-white/50 text-sm">{service.tagline}</p>
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-auto flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors group"
                  >
                    Learn more
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </GradientBorder>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
