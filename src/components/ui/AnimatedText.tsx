'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  once?: boolean
}

export function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const words = text.split(' ')

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
            delay: delay + i * 0.08,
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

export function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span
      className={`bg-linear-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  )
}
