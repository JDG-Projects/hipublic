'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Stat {
  value: string
  label: string
}

interface StatsSectionProps {
  stats?: Stat[]
}

const defaultStats: Stat[] = [
  { value: '500+', label: 'Campaigns Launched' },
  { value: '10K+', label: 'Creator Network' },
  { value: '50+', label: 'Countries Reached' },
  { value: '98%', label: 'Client Satisfaction' },
]

export function StatsSection({ stats = defaultStats }: StatsSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-purple-900/10 via-transparent to-cyan-900/10" />
      <div className="absolute inset-0 border-y border-white/5" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-black bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-white/50 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
