import React from 'react'
import { Mail, MapPin, Clock } from 'lucide-react'
import { ContactForm } from '@/components/forms/ContactForm'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientText } from '@/components/ui/AnimatedText'

export const metadata = {
  title: 'Contact — HiPublic',
  description: 'Get in touch with HiPublic. Whether you\'re a brand or influencer, we\'d love to hear from you.',
}

const info = [
  { icon: <Mail size={18} />, label: 'Email', value: 'hello@hipublic.com' },
  { icon: <MapPin size={18} />, label: 'Location', value: 'Global — Remote First' },
  { icon: <Clock size={18} />, label: 'Response time', value: 'Within 24 hours' },
]

export default function ContactPage() {
  return (
    <div className="pt-16">
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <SectionWrapper>
              <span className="text-sm font-semibold text-purple-400 tracking-widest uppercase mb-4 block">
                Contact Us
              </span>
              <h1 className="text-5xl sm:text-6xl font-black mb-6 leading-tight">
                Let&apos;s <GradientText>Work</GradientText>
                <br />Together
              </h1>
              <p className="text-white/50 text-lg mb-10 leading-relaxed">
                Whether you&apos;re a brand looking to launch your next campaign or an influencer
                ready to collaborate — tell us about yourself and we&apos;ll get back to you
                within 24 hours.
              </p>

              <div className="flex flex-col gap-4">
                {info.map((item) => (
                  <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/8">
                    <div className="w-10 h-10 rounded-lg bg-purple-600/20 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-white/40 font-medium uppercase tracking-wide">{item.label}</div>
                      <div className="text-white/80 text-sm font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionWrapper>

            {/* Right — Form */}
            <SectionWrapper delay={0.2}>
              <div className="relative p-px rounded-2xl bg-linear-to-br from-purple-600/40 via-cyan-500/20 to-purple-600/40">
                <div className="rounded-2xl bg-[#0f0f1a] p-8">
                  <ContactForm />
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>
    </div>
  )
}
