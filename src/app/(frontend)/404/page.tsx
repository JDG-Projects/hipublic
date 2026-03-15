'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFoundPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Dynamic glow that follows mouse */}
      <div
        className="pointer-events-none fixed inset-0 transition-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(147,51,234,0.07), transparent 60%)`,
        }}
      />

      {/* Static ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mb-6 select-none"
        >
          <span className="text-[10rem] sm:text-[14rem] font-black leading-none bg-linear-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            404
          </span>
          <div className="absolute inset-0 text-[10rem] sm:text-[14rem] font-black leading-none text-white/3 blur-sm select-none">
            404
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-3xl sm:text-4xl font-black mb-4 text-white"
        >
          Page not found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-white/40 text-lg leading-relaxed mb-10 max-w-md"
        >
          Looks like this page doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home size={16} />
            Back to Home
          </Link>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/8 text-white/70 hover:text-white font-semibold text-sm border border-white/10 hover:border-white/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Search size={16} />
            Browse Blog
          </Link>
          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-transparent hover:bg-white/5 text-white/40 hover:text-white/70 font-semibold text-sm transition-all duration-200"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/8 w-full flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/25"
        >
          <span>Quick links:</span>
          {[
            { href: '/services', label: 'Services' },
            { href: '/blog', label: 'Blog' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-white/60 transition-colors"
            >
              {label}
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
