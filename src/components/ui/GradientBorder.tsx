import React from 'react'

interface GradientBorderProps {
  children: React.ReactNode
  className?: string
}

export function GradientBorder({ children, className = '' }: GradientBorderProps) {
  return (
    <div className={`relative p-px rounded-2xl bg-linear-to-br from-purple-600/50 via-cyan-500/30 to-purple-600/50 ${className}`}>
      <div className="rounded-2xl bg-[#0f0f1a] h-full w-full">
        {children}
      </div>
    </div>
  )
}
