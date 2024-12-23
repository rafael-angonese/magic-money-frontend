export enum CategoryType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export interface Category {
  id: number
  type: keyof typeof CategoryType
  name: string
  createdAt: string
  updatedAt: string
}
