import { headers as getHeaders } from 'next/headers.js'
import { redirect } from 'next/navigation'
import { getPayloadClient } from './payload'

export async function getUser() {
  const headers = await getHeaders()
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers })
  return user ?? null
}

export async function requireAuth(redirectTo = '/auth/login') {
  const user = await getUser()
  if (!user) redirect(redirectTo)
  return user
}
