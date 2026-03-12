import React from 'react'
import Link from 'next/link'
import { requireAuth } from '@/lib/auth'
import { LayoutDashboard, User, LogOut } from 'lucide-react'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAuth()

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="p-6 rounded-2xl bg-white/3 border border-white/8">
              {/* User info */}
              <div className="flex items-center gap-3 pb-6 mb-6 border-b border-white/8">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-600/60 to-cyan-500/40 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {((user as { firstName?: string }).firstName ?? user.email ?? 'U')[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white truncate">
                    {(user as { firstName?: string }).firstName ?? 'User'}
                  </div>
                  <div className="text-xs text-white/40 truncate">{user.email}</div>
                </div>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-1">
                <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                  <User size={16} /> Profile
                </Link>
              </nav>

              <div className="mt-6 pt-6 border-t border-white/8">
                <form action="/api/users/logout" method="POST">
                  <button
                    type="submit"
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </form>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
