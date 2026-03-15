import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getPayloadClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set')
  }
  return getPayload({ config: await config })
}
