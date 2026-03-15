import React from 'react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { GradientText } from '@/components/ui/AnimatedText'

export const metadata = {
  title: 'hiPublic | About',
  description:
    'Learn about HiPublic, the global influencer marketing agency connecting brands with creators worldwide.',
}

export const revalidate = 3600

const values = [
  {
    title: 'Data-Driven',
    desc: 'Every campaign decision is backed by analytics and performance data.',
    emoji: '📊',
  },
  {
    title: 'Creative First',
    desc: 'We believe authentic storytelling creates the most impactful campaigns.',
    emoji: '✨',
  },
  {
    title: 'Global Reach',
    desc: 'With creators in 50+ countries, your message can reach anywhere.',
    emoji: '🌍',
  },
  {
    title: '24/7 Support',
    desc: 'Our team is always available to support your campaigns around the clock.',
    emoji: '🛡️',
  },
]

const team = [
  { name: 'Alex Johnson', role: 'CEO & Founder', img: null },
  { name: 'Maria Petrova', role: 'Head of Strategy', img: null },
  { name: 'David Chen', role: 'Performance Director', img: null },
  { name: 'Sara Kowalski', role: 'Creative Lead', img: null },
]

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionWrapper>
            <span className="text-sm font-semibold text-purple-400 tracking-widest uppercase mb-4 block">
              What We Do
            </span>
            <h1 className="text-5xl sm:text-6xl font-black mb-6">
              The <GradientText>Wizards</GradientText> of <br className="hidden sm:block" />
              Influencer Marketing
            </h1>
            <p className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed">
              We&apos;re the Cupid of brands and influencers — casting spells worldwide to create
              campaigns that truly resonate with audiences.
            </p>
          </SectionWrapper>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionWrapper>
              <span className="text-sm font-semibold text-cyan-400 tracking-widest uppercase mb-4 block">
                Our Mission
              </span>
              <h2 className="text-4xl font-black mb-6">
                Bridging Brands{' '}
                <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  & Creators
                </span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                HiPublic was founded with a simple belief: the right influencer partnership can
                transform a brand. We&apos;ve spent years perfecting the art of matching brands with
                creators who share their values and reach their audience.
              </p>
              <p className="text-white/60 leading-relaxed">
                From iGaming giants to emerging e-commerce brands, we&apos;ve helped hundreds of
                companies amplify their message through authentic creator partnerships that deliver
                measurable ROI.
              </p>
            </SectionWrapper>

            <SectionWrapper delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: '500+', l: 'Campaigns' },
                  { v: '10K+', l: 'Creators' },
                  { v: '50+', l: 'Countries' },
                  { v: '5+', l: 'Years' },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-2xl bg-white/3 border border-white/8 p-6 text-center"
                  >
                    <div className="text-3xl font-black bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      {s.v}
                    </div>
                    <div className="text-sm text-white/50 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionWrapper className="text-center mb-14">
            <h2 className="text-4xl font-black mb-4">Our Values</h2>
            <p className="text-white/50 max-w-xl mx-auto">
              The principles that guide every campaign we run.
            </p>
          </SectionWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <SectionWrapper key={v.title} delay={i * 0.08}>
                <div className="p-6 rounded-2xl bg-white/3 border border-white/8 hover:border-purple-500/30 transition-colors">
                  <div className="text-3xl mb-4">{v.emoji}</div>
                  <h3 className="font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionWrapper className="text-center mb-14">
            <h2 className="text-4xl font-black mb-4">Meet the Team</h2>
            <p className="text-white/50 max-w-xl mx-auto">
              The people behind HiPublic&apos;s success.
            </p>
          </SectionWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <SectionWrapper key={member.name} delay={i * 0.08}>
                <div className="p-6 rounded-2xl bg-white/3 border border-white/8 text-center">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-600/40 to-cyan-500/30 mx-auto mb-4 flex items-center justify-center text-2xl font-black text-white/30">
                    {member.name[0]}
                  </div>
                  <h3 className="font-bold text-white">{member.name}</h3>
                  <p className="text-sm text-purple-400 mt-1">{member.role}</p>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  )
}
