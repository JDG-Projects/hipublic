'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogOut, LayoutDashboard, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/what-we-do', label: 'What We Do' },
  { href: '/services', label: 'Advantages' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

interface NavbarProps {
  user?: { email: string; firstName?: string } | null
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleLogout = async () => {
    await fetch('/api/users/logout', { method: 'POST' })
    window.location.href = '/'
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center"
      >
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple-500/60 to-transparent" />

        {/* Navbar background */}
        <div
          className={`absolute inset-0 transition-all duration-500 border-b ${
            scrolled
              ? 'bg-[#07070f]/90 backdrop-blur-2xl border-white/6'
              : 'bg-transparent border-transparent'
          }`}
        />

        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-br from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow duration-300">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="text-[15px] font-black tracking-tight">
              <span className="text-white">Hi</span>
              <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                PUBLIC
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <li key={link.href} className="p-4">
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 flex flex-col items-center gap-0.5 ${
                      active ? 'text-white' : 'text-white/50 hover:text-white/90'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/7 rounded-lg"
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                    {active && (
                      <motion.span
                        layoutId="nav-dot"
                        className="relative w-1 h-1 rounded-full bg-linear-to-r from-purple-400 to-cyan-400"
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-1">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/6 transition-all duration-200 group"
                >
                  <LayoutDashboard
                    size={14}
                    className="group-hover:text-purple-400 transition-colors"
                  />
                  <span>{user.firstName ?? user.email.split('@')[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-white/30 hover:text-white/70 hover:bg-white/6 rounded-lg transition-all duration-200"
                  title="Logout"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/60 hover:text-white text-sm"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/contact">
                  <button className="group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-xl overflow-hidden transition-all duration-300">
                    <span className="absolute inset-0 bg-linear-to-r from-purple-600 to-violet-600 transition-all duration-300 group-hover:from-purple-500 group-hover:to-violet-500" />
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-purple-500/80 to-cyan-500/80" />
                    <span className="relative">Get Started</span>
                    <ArrowRight
                      size={14}
                      className="relative transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/6 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.15 }}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden bg-black/70 backdrop-blur-md"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 z-50 md:hidden w-80 flex flex-col"
            >
              {/* Drawer bg */}
              <div className="absolute inset-0 bg-[#0d0d1a]/95 backdrop-blur-2xl border-l border-white/7" />
              {/* Top gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple-500/50 to-transparent" />

              <div className="relative flex flex-col h-full p-6 pt-20">
                {/* Close button */}
                <button
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-5 right-5 p-2 text-white/40 hover:text-white hover:bg-white/6 rounded-lg transition-all duration-200"
                >
                  <X size={18} />
                </button>

                {/* Logo in drawer */}
                <div className="flex items-center gap-2.5 mb-8">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-linear-to-br from-purple-500 to-cyan-500">
                    <Sparkles size={12} className="text-white" />
                  </div>
                  <span className="text-[14px] font-black tracking-tight">
                    <span className="text-white">Hi</span>
                    <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      PUBLIC
                    </span>
                  </span>
                </div>

                {/* Nav links */}
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link, i) => {
                    const active = pathname === link.href
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                            active
                              ? 'bg-linear-to-r from-purple-600/20 to-cyan-500/10 text-white border border-purple-500/20'
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span>{link.label}</span>
                          {active && (
                            <span className="w-1.5 h-1.5 rounded-full bg-linear-to-r from-purple-400 to-cyan-400" />
                          )}
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>

                {/* Bottom CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  className="mt-auto flex flex-col gap-3"
                >
                  <div className="h-px bg-white/6" />
                  {user ? (
                    <>
                      <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-center">
                          <LayoutDashboard size={15} /> Dashboard
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full justify-center text-white/50"
                        onClick={handleLogout}
                      >
                        <LogOut size={15} /> Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/login" onClick={() => setMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-center">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/contact" onClick={() => setMenuOpen(false)}>
                        <button className="group relative w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-xl overflow-hidden">
                          <span className="absolute inset-0 bg-linear-to-r from-purple-600 to-violet-600" />
                          <span className="relative">Get Started</span>
                          <ArrowRight
                            size={15}
                            className="relative transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </button>
                      </Link>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
