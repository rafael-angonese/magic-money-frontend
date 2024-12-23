import z from '@/lib/zod'
import { CategoryType } from '@/types/category'

import { formLabels } from './form-labels'

const category = z.object({
  id: z.number(),
  name: z.string().min(1),
  type: z.nativeEnum(CategoryType),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const bankAccount = z.object({
  id: z.number(),
  name: z.string().min(1),
  balance: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const formValidation = z.object({
  date: z.coerce.date().describe(formLabels.date),
  description: z.string().min(1).describe(formLabels.description),
  amount: z.number().describe(formLabels.amount),
  categoryId: category.describe(formLabels.categoryId),
  sourceBankAccountId: bankAccount.describe(formLabels.sourceBankAccountId),
  documentIds: z.array(z.number()).describe(formLabels.documentIds),
})
