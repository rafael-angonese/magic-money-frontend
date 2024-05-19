import z from '@/lib/zod'
import { BankAccount } from '@/types/bank-acount'
import { Category, CategoryType } from '@/types/category'

import { formLabels } from './form-labels'

const category: z.ZodType<Category> = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.nativeEnum(CategoryType),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const bankAccount: z.ZodType<BankAccount> = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  userId: z.string(),
  balance: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const formValidation = z.object({
  date: z.coerce.date().describe(formLabels.date),
  description: z.string().min(1).describe(formLabels.description),
  amount: z.number().describe(formLabels.amount),
  categoryId: category.describe(formLabels.categoryId),
  bankAccountId: bankAccount.describe(formLabels.bankAccountId),
  files: z.array(z.instanceof(File)).describe(formLabels.files),
})
