export enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export interface Transaction {
  id: number
  date: string
  description: string
  amount: number
  type: keyof typeof TransactionType
  categoryId: string
  userId: string
  bankAccountId: string
  sourceAccountId: string
  createdAt: string
  updatedAt: string
}
