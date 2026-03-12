import React from 'react'
import { getUser } from '@/lib/auth'
import { getPayloadClient } from '@/lib/payload'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

export const metadata = {
  title: 'HiPublic — Global Influencer Marketing Agency',
  description:
    'From Now to Wow. We connect brands with the right influencers to create campaigns that captivate audiences and drive measurable results worldwide.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'HiPublic — Global Influencer Marketing Agency',
    description: 'From Now to Wow. Global influencer marketing at scale.',
    type: 'website',
  },
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [user, payload] = await Promise.all([
    getUser().catch(() => null),
    getPayloadClient().catch(() => null),
  ])

  let socialLinks
  if (payload) {
    try {
      const settings = await payload.findGlobal({ slug: 'site-settings' })
      socialLinks = (settings as { socialLinks?: Record<string, string> })?.socialLinks
    } catch {
      // settings not configured yet
    }
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
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
        <Footer socialLinks={socialLinks} />
      </body>
    </html>
  )
}
