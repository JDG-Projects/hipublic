'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, TrendingUp, CheckCircle } from 'lucide-react'
import { contactSchema, type ContactFormData } from '@/lib/validations/contact'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const selectedRole = watch('role')

  const onSubmit = async (data: ContactFormData) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) setSubmitted(true)
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center text-center py-16 gap-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center"
          >
            <CheckCircle size={32} className="text-green-400" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
          <p className="text-white/50 max-w-sm">
            Thanks for reaching out. Our team will get back to you within 24 hours.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          {/* Role selector */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-white/70">I am a...</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'influencer' as const, label: 'Influencer', icon: <Star size={18} />, desc: 'Content creator' },
                { value: 'media_buyer' as const, label: 'Media Buyer', icon: <TrendingUp size={18} />, desc: 'Brand / Agency' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setValue('role', opt.value, { shouldValidate: true })}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                    selectedRole === opt.value
                      ? 'border-purple-500/60 bg-purple-500/10 text-white'
                      : 'border-white/10 bg-white/3 text-white/60 hover:border-white/20 hover:text-white/80'
                  }`}
                >
                  <span className={selectedRole === opt.value ? 'text-purple-400' : 'text-white/40'}>
                    {opt.icon}
                  </span>
                  <div>
                    <div className="font-semibold text-sm">{opt.label}</div>
                    <div className="text-xs opacity-60">{opt.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            {errors.role && <p className="text-sm text-red-400">{errors.role.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="firstName"
              label="First Name"
              placeholder="John"
              error={errors.firstName?.message}
              {...register('firstName')}
            />
            <Input
              id="lastName"
              label="Last Name"
              placeholder="Doe"
              error={errors.lastName?.message}
              {...register('lastName')}
            />
          </div>

          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="phone"
              label="Phone (optional)"
              placeholder="+1 234 567 890"
              {...register('phone')}
            />
            <Input
              id="company"
              label="Company (optional)"
              placeholder="Your company"
              {...register('company')}
            />
          </div>

          <Textarea
            id="message"
            label="Message"
            placeholder="Tell us about your project, goals, and timeline..."
            rows={5}
            error={errors.message?.message}
            {...register('message')}
          />

          <Button type="submit" variant="primary" size="lg" loading={isSubmitting} className="w-full">
            Send Message
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
