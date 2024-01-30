export enum CategoryType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export interface Category {
  id: string
  type: keyof typeof CategoryType
  name: string
  created_at: string
  updatedAt: string
}
