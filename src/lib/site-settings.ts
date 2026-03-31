import { unstable_cache } from 'next/cache'
import { getPayloadClient } from './payload'

export const getCachedSiteSettings = unstable_cache(
  async () => {
    try {
      const payload = await getPayloadClient()
      const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 })
      return settings as {
        socialLinks?: Record<string, string>
        footerLinks?: Array<{ title: string; slug: string }> | null
      } | null
    } catch {
      return null
    }
  },
  ['site-settings'],
  { revalidate: 3600 },
)
