import React from 'react'
import Link from 'next/link'
import { RegisterForm } from '@/components/forms/RegisterForm'

export const metadata = {
  title: 'Create Account — HiPublic',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 relative">
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-cyan-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-black">
              <span className="text-white">Hi</span>
              <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">PUBLIC</span>
            </span>
          </Link>
          <h1 className="text-3xl font-black mb-2">Create Account</h1>
          <p className="text-white/50 text-sm">Join HiPublic and start growing your campaigns</p>
        </div>

        <div className="p-px rounded-2xl bg-linear-to-br from-purple-600/40 via-transparent to-cyan-500/20">
          <div className="rounded-2xl bg-[#0f0f1a] p-8">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}
