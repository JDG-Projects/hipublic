'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setError(null)

    // 1. Register
    const createRes = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!createRes.ok) {
      const body = await createRes.json().catch(() => ({}))
      setError(body?.errors?.[0]?.message ?? 'Registration failed. Email may already be in use.')
      return
    }

    // 2. Auto-login
    const loginRes = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email, password: data.password }),
    })

    if (loginRes.ok) {
      router.push('/dashboard')
      router.refresh()
    } else {
      router.push('/auth/login')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
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
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="Min 8 characters"
        error={errors.password?.message}
        {...register('password')}
      />

      <Button type="submit" variant="primary" size="lg" loading={isSubmitting} className="w-full mt-2">
        Create Account
      </Button>

      <p className="text-center text-sm text-white/40">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-purple-400 hover:text-purple-300">
          Sign in
        </Link>
      </p>
    </form>
  )
}
