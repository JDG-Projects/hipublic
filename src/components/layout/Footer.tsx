import React from 'react'
import Link from 'next/link'
import { Instagram, Linkedin, Twitter, Send, Youtube } from 'lucide-react'

interface FooterPage {
  title: string
  slug: string
}

interface FooterProps {
  socialLinks?: {
    instagram?: string
    linkedin?: string
    twitter?: string
    telegram?: string
    youtube?: string
  }
  footerPages?: FooterPage[]
}

const footerLinks = {
  Company: [
    { href: '/what-we-do', label: 'What We Do' },
    { href: '/services', label: 'Advantages' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
  Services: [
    { href: '/services/influencer-marketing', label: 'Influencer Marketing' },
    { href: '/services/campaign-strategy', label: 'Campaign Strategy' },
    { href: '/services/performance-analytics', label: 'Performance Analytics' },
    { href: '/services/brand-partnerships', label: 'Brand Partnerships' },
  ],
  Legal: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
    { href: '/cookie-policy', label: 'Cookie Policy' },
  ],
}

export function Footer({ socialLinks, footerPages }: FooterProps) {
  return (
    <footer className="border-t border-white/5 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-black tracking-tight">
                <span className="text-white">Hi</span>
                <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  PUBLIC
                </span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Global influencer marketing agency connecting brands with creators worldwide. From now
              to wow.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks?.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 text-white/50 border border-white/8 hover:bg-purple-600/20 hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200"
                >
                  <Instagram size={18} />
                </a>
              )}
              {socialLinks?.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 text-white/50 border border-white/8 hover:bg-purple-600/20 hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200"
                >
                  <Linkedin size={18} />
                </a>
              )}
              {socialLinks?.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 text-white/50 border border-white/8 hover:bg-purple-600/20 hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200"
                >
                  <Twitter size={18} />
                </a>
              )}
              {socialLinks?.telegram && (
                <a
                  href={socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 text-white/50 border border-white/8 hover:bg-purple-600/20 hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200"
                >
                  <Send size={18} />
                </a>
              )}
              {socialLinks?.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 text-white/50 border border-white/8 hover:bg-purple-600/20 hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200"
                >
                  <Youtube size={18} />
                </a>
              )}
              {/* Default icons if no links configured */}
              {!socialLinks?.instagram && (
                <a
                  href="#"
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 text-white/50 border border-white/8 hover:bg-purple-600/20 hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200"
                >
                  <Instagram size={18} />
                </a>
              )}
              {!socialLinks?.linkedin && (
                <a
                  href="#"
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 text-white/50 border border-white/8 hover:bg-purple-600/20 hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200"
                >
                  <Linkedin size={18} />
                </a>
              )}
              {!socialLinks?.twitter && (
                <a
                  href="#"
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 text-white/50 border border-white/8 hover:bg-purple-600/20 hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200"
                >
                  <Twitter size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">
                {title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CMS Pages */}
          {footerPages && footerPages.length > 0 && (
            <div>
              <h3 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">
                Pages
              </h3>
              <ul className="flex flex-col gap-2.5">
                {footerPages.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/${page.slug}`}
                      className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} HiPublic. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">Global Influencer Marketing Agency</p>
        </div>
      </div>
    </footer>
  )
}
