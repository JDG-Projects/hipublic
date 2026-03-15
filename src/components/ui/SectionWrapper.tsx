'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function SectionWrapper({ children, className = '', delay = 0 }: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      // No opacity:0 initial — content is always visible (SSR + before JS)
      // Only animate translateY as a subtle enhancement
      initial={{ y: 24 }}
      animate={{ y: isInView ? 0 : 24 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
