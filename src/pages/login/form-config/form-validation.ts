import z from '@/lib/zod'
import { formLabels } from './form-labels'

export const formValidation = z.object({
  email: z.string().email().describe(formLabels.email),
  password: z.string().min(1).describe(formLabels.password),
})
