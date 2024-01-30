import { CategoryType } from '@/types/category'

export const categoryTypeTranslations: Record<CategoryType, string> = {
  [CategoryType.DEBIT]: 'Débito',
  [CategoryType.CREDIT]: 'Crédito',
}
