import { TransactionType } from '@/types/transaction'

export const transactionTypeTranslations: Record<TransactionType, string> = {
  [TransactionType.DEBIT]: 'Débito',
  [TransactionType.CREDIT]: 'Crédito',
}
