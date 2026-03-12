import React from 'react'
import Link from 'next/link'
import { requireAuth } from '@/lib/auth'
import { ArrowRight, Mail, User, Star } from 'lucide-react'

export const metadata = {
  title: 'Dashboard — HiPublic',
}

export default async function DashboardPage() {
  const user = await requireAuth()
  const firstName = (user as { firstName?: string }).firstName ?? 'there'

  const quickLinks = [
    { href: '/contact', icon: <Mail size={20} />, title: 'Start a Campaign', desc: 'Submit a new campaign request', color: 'from-purple-600/30 to-purple-500/10' },
    { href: '/services', icon: <Star size={20} />, title: 'Our Services', desc: 'Browse all available services', color: 'from-cyan-600/30 to-cyan-500/10' },
    { href: '/dashboard/profile', icon: <User size={20} />, title: 'Edit Profile', desc: 'Update your account info', color: 'from-purple-600/20 to-cyan-500/10' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-1">
          Welcome back, {firstName} 👋
        </h1>
        <p className="text-white/50">Here&apos;s what&apos;s happening with your account.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {quickLinks.map((item) => (
          <Link key={item.href} href={item.href} className="group">
            <div className={`p-5 rounded-2xl bg-linear-to-br ${item.color} border border-white/8 hover:border-white/15 transition-all duration-200`}>
              <div className="flex items-start justify-between mb-4">
                <div className="text-purple-400">{item.icon}</div>
                <ArrowRight size={16} className="text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
              <p className="text-white/40 text-xs">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-white/3 border border-white/8">
        <h2 className="font-bold text-white mb-4">Account Details</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-xs text-white/40 uppercase tracking-wide mb-1">Email</dt>
            <dd className="text-white/80 text-sm">{user.email}</dd>
          </div>
          <div>
            <dt className="text-xs text-white/40 uppercase tracking-wide mb-1">Name</dt>
            <dd className="text-white/80 text-sm">
              {(user as { firstName?: string; lastName?: string }).firstName ?? '—'}{' '}
              {(user as { lastName?: string }).lastName ?? ''}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-white/40 uppercase tracking-wide mb-1">Role</dt>
            <dd>
              <span className="text-xs px-2 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-400">
                {(user as { role?: string }).role ?? 'user'}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
