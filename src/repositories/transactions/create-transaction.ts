import { AxiosRequestConfig } from 'axios'

import { api } from '@/lib/api'
import { Transaction, TransactionType } from '@/types/transaction'

export interface CreateTransactionsRequest {
  date: Date | string
  description: string
  amount: number
  type: TransactionType
  categoryId: string
  bankAccountId: string
}

export interface CreateTransactionsResponse {
  data: Transaction
}

export const createTransaction = (
  data: CreateTransactionsRequest,
  config?: AxiosRequestConfig,
) => {
  return api.post<CreateTransactionsResponse>('/transactions', data, config)
}
