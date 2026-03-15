import React, { Suspense } from 'react'
import { Inter, Syne } from 'next/font/google'
import { getUser } from '@/lib/auth'
import { getCachedSiteSettings } from '@/lib/site-settings'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata = {
  title: 'hiPublic | Home page',
  description:
    'From Now to Wow. We connect brands with the right influencers to create campaigns that captivate audiences and drive measurable results worldwide.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'hiPublic | Home page',
    description: 'From Now to Wow. Global influencer marketing at scale.',
    type: 'website',
  },
}

async function NavbarServer() {
  const user = await getUser().catch(() => null)
  return (
    <Navbar
      user={
        user
          ? {
              email: user.email ?? '',
              firstName: (user as { firstName?: string }).firstName,
            }
          : null
      }
    />
  )
}

async function FooterServer() {
  const settings = await getCachedSiteSettings()
  return <Footer socialLinks={settings?.socialLinks} />
}

function NavbarFallback() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-[#07070f]/80 backdrop-blur-xl">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple-500/60 to-transparent" />
    </header>
  )
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Suspense fallback={<NavbarFallback />}>
          <NavbarServer />
        </Suspense>
        <main>{children}</main>
        <Suspense fallback={<Footer />}>
          <FooterServer />
        </Suspense>
      </body>
    </html>
  )
}
