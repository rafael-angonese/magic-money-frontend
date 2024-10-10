import z from '@/lib/zod'

import { formLabels } from './form-labels'

const category = z.object({
  id: z.number(),
  name: z.string().min(1),
})

const bankAccount = z.object({
  id: z.number().min(1),
  name: z.string().min(1),
})

export const formValidation = z.object({
  date: z.coerce.date().describe(formLabels.date),
  description: z.string().min(1).describe(formLabels.description),
  amount: z.number().describe(formLabels.amount),
  categoryId: category.describe(formLabels.categoryId),
  bankAccountId: bankAccount.describe(formLabels.bankAccountId),
  files: z.array(z.instanceof(File)).describe(formLabels.files),
})
