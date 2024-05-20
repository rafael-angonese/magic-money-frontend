import { AxiosRequestConfig } from 'axios'

import { api } from '@/lib/api'
import { Transaction, TransactionType } from '@/types/transaction'

export interface TransactionFile {
  name: string
  originalName: string
  contentType: string
  size: number
}

export interface CreateTransactionsRequest {
  date: Date | string
  description: string
  amount: number
  type: TransactionType
  categoryId: string
  bankAccountId: string
  files?: TransactionFile[]
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
