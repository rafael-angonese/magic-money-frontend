import z from '@/lib/zod'

import { formLabels } from './form-labels'

export const formValidation = z.object({
  date: z.coerce.date().describe(formLabels.date),
  description: z.string().min(1).describe(formLabels.description),
  amount: z.number().describe(formLabels.amount),
  categoryId: z
    .object({
      id: z.string().min(1),
      name: z.string().min(1),
    })
    .describe(formLabels.categoryId),
  bankAccountId: z
    .object({
      id: z.string().min(1),
      name: z.string().min(1),
    })
    .describe(formLabels.bankAccountId),
})
