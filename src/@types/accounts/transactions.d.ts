interface Category {
  id: string
  name: string
}

interface BankAccount {
  id: string
  name: string
}


export interface ITransaction {
  id: string
  date: string
  description: string
  amount: number
  type: string
  category_id: string
  user_id: string
  account_id: string
  bank_account_id: string
  created_at: string
  updatedAt: string
  category: Category
  bankAccount: BankAccount
}
