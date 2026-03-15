import React from 'react'
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

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [user, settings] = await Promise.all([
    getUser().catch(() => null),
    getCachedSiteSettings(),
  ])

  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="flex flex-col min-h-screen">
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
        <main>{children}</main>
        <Footer socialLinks={settings?.socialLinks} />
      </body>
    </html>
  )
}
