import z from '@/lib/zod'
import { formLabels } from './form-labels'

export const formValidation = z.object({
  name: z.string().describe(formLabels.name),
  balance: z.number().describe(formLabels.balance),
})
