import React from 'react'
import Link from 'next/link'
import { LoginForm } from '@/components/forms/LoginForm'

export const metadata = {
  title: 'hiPublic | Sign In',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-black">
              <span className="text-white">Hi</span>
              <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">PUBLIC</span>
            </span>
          </Link>
          <h1 className="text-3xl font-black mb-2">Welcome Back</h1>
          <p className="text-white/50 text-sm">Sign in to your HiPublic account</p>
        </div>

        <div className="p-px rounded-2xl bg-linear-to-br from-purple-600/40 via-transparent to-cyan-500/20">
          <div className="rounded-2xl bg-[#0f0f1a] p-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
