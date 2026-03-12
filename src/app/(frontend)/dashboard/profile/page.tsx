'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function ProfilePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    const formData = new FormData(e.currentTarget)

    await fetch('/api/users/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        phone: formData.get('phone'),
        companyName: formData.get('companyName'),
      }),
    })

    setSaving(false)
    setSaved(true)
    router.refresh()
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-1">Edit Profile</h1>
        <p className="text-white/50">Update your account information.</p>
      </div>

      <div className="max-w-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <Input id="firstName" name="firstName" label="First Name" placeholder="John" />
            <Input id="lastName" name="lastName" label="Last Name" placeholder="Doe" />
          </div>
          <Input id="phone" name="phone" label="Phone" placeholder="+1 234 567 890" type="tel" />
          <Input id="companyName" name="companyName" label="Company Name" placeholder="Your company" />

          <div className="flex items-center gap-4 mt-2">
            <Button type="submit" variant="primary" loading={saving}>
              Save Changes
            </Button>
            {saved && <span className="text-sm text-green-400">Saved successfully!</span>}
          </div>
        </form>
      </div>
    </div>
  )
}
