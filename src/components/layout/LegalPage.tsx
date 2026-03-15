import React from 'react'

interface Section {
  heading: string
  content: React.ReactNode
}

interface LegalPageProps {
  title: string
  subtitle: string
  lastUpdated: string
  sections: Section[]
}

export function LegalPage({ title, subtitle, lastUpdated, sections }: LegalPageProps) {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/8">
        <div className="absolute top-0 left-1/3 w-96 h-64 bg-purple-600/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="text-xs font-semibold text-purple-400 tracking-widest uppercase mb-4">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">{title}</h1>
          <p className="text-white/40 text-lg mb-6">{subtitle}</p>
          <p className="text-sm text-white/25">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={i} className="group">
                <div className="flex items-start gap-4">
                  <span className="mt-1 text-xs font-mono text-purple-500/50 w-6 shrink-0 select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-white mb-3">{section.heading}</h2>
                    <div className="text-white/50 text-sm leading-relaxed space-y-3">
                      {section.content}
                    </div>
                  </div>
                </div>
                {i < sections.length - 1 && (
                  <div className="mt-10 border-t border-white/5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
