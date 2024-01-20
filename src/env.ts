import z from '@/lib/zod'

const envSchema = z.object({
  MODE: z.enum(['production', 'development', 'test']),
  VITE_API_BASE_URL: z.string(),
})

export const env = envSchema.parse(import.meta.env)
