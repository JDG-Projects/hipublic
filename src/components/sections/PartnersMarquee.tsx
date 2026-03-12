import React from 'react'

interface Partner {
  id: string
  name: string
  logo?: { url?: string }
  website?: string
}

interface PartnersMarqueeProps {
  partners?: Partner[]
}

const fallbackPartners: Partner[] = [
  { id: '1', name: '1xBet' },
  { id: '2', name: 'Stake' },
  { id: '3', name: 'Betway' },
  { id: '4', name: 'GGPoker' },
  { id: '5', name: 'Shopify' },
  { id: '6', name: 'Revolut' },
  { id: '7', name: 'Binance' },
  { id: '8', name: 'Coinbase' },
]

export function PartnersMarquee({ partners }: PartnersMarqueeProps) {
  const items = (partners && partners.length > 0 ? partners : fallbackPartners)
  const doubled = [...items, ...items] // for seamless loop

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <p className="text-sm text-white/30 tracking-widest uppercase">Trusted by leading brands</p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-[#07070f] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-[#07070f] to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden">
          <div className="flex marquee-track" style={{ width: 'max-content' }}>
            {doubled.map((partner, i) => (
              <div
                key={`${partner.id}-${i}`}
                className="flex items-center justify-center mx-8 min-w-[140px] h-14 px-6 rounded-xl bg-white/3 border border-white/6 hover:border-white/15 transition-all duration-300 group"
              >
                {partner.logo?.url ? (
                  <img
                    src={partner.logo.url}
                    alt={partner.name}
                    className="max-h-8 max-w-[110px] object-contain filter grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-90 transition-all duration-300"
                  />
                ) : (
                  <span className="text-white/40 font-bold text-sm group-hover:text-white/70 transition-colors tracking-wide">
                    {partner.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
