import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative z-10">
        <div className="text-8xl font-black bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-3xl font-black mb-3">Page Not Found</h1>
        <p className="text-white/50 mb-8 max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}
