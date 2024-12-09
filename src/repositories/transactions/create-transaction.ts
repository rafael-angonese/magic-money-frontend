import { AxiosRequestConfig } from 'axios'

import { api } from '@/lib/api'
import { Transaction, TransactionType } from '@/types/transaction'
export interface CreateTransactionsRequest {
  date: Date | string
  description: string
  amount: number
  type: TransactionType
  categoryId: string | number
  sourceBankAccountId: string | number
  files?: File[]
}

export const createTransaction = (
  data: CreateTransactionsRequest,
  config?: AxiosRequestConfig,
) => {
  const formData = new FormData()

  formData.append('date', data.date.toString())
  formData.append('description', data.description)
  formData.append('amount', data.amount.toString())
  formData.append('type', data.type)
  formData.append('categoryId', String(data.categoryId))
  formData.append('sourceBankAccountId', String(data.sourceBankAccountId))

  if (data.files) {
    data.files.forEach((file, index) =>
      formData.append(`files[${index}]`, file),
    )
  }

  return api.post<Transaction>('/transactions', formData, {
    ...config,
    headers: {
      ...config?.headers,
      'Content-Type': 'multipart/form-data',
    },
  })
}
