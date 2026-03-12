'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Button } from '@/components/ui/Button'

export function ContactCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionWrapper>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-linear-to-br from-purple-900/60 via-purple-800/40 to-cyan-900/40" />
            <div className="absolute inset-0 bg-[#07070f]/40" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/30 rounded-full blur-[80px]" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="inline-block text-sm font-semibold text-cyan-400 tracking-widest uppercase mb-6">
                  Ready to Start?
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                  Let&apos;s Create Your{' '}
                  <span className="bg-linear-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
                    Next Campaign
                  </span>
                </h2>
                <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
                  Whether you&apos;re a brand looking to grow or an influencer ready to collaborate —
                  we&apos;re here to make it happen.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contact">
                    <Button variant="primary" size="lg" className="group">
                      Get in Touch
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button variant="outline" size="lg">
                      View Services
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
