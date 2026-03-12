import { z } from 'zod'

export const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  company: z.string().optional(),
  role: z.enum(['influencer', 'media_buyer']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

export type ContactFormData = z.infer<typeof contactSchema>
