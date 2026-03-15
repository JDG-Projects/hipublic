import { NextRequest, NextResponse } from 'next/server'

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const [, payloadPart] = token.split('.')
    if (!payloadPart) return null
    const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=')
    return JSON.parse(atob(padded))
  } catch {
    return null
  }
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get('payload-token')?.value

  if (!token) {
    return NextResponse.rewrite(new URL('/404', req.url))
  }

  const payload = decodeJwtPayload(token)

  if (payload?.role !== 'admin') {
    return NextResponse.rewrite(new URL('/404', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin(.*)'],
}
