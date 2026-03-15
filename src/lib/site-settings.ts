import { unstable_cache } from 'next/cache'
import { getPayloadClient } from './payload'

export const getCachedSiteSettings = unstable_cache(
  async () => {
    try {
      const payload = await getPayloadClient()
      const settings = await payload.findGlobal({ slug: 'site-settings' })
      return settings as { socialLinks?: Record<string, string> } | null
    } catch {
      return null
    }
  },
  ['site-settings'],
  { revalidate: 3600 },
)
