import { AxiosRequestConfig } from 'axios'

import { DEFAULT_PER_PAGE } from '@/constants/default-per-page'
import { api } from '@/lib/api'
import { BankAccount } from '@/types/bank-acount'
import { Category } from '@/types/category'
import { Meta } from '@/types/meta'
import { Transaction } from '@/types/transaction'
import toQueryString from '@/utils/to-query-string'

export interface GetTransactionsRequest {
  qs?: string
  page?: number
  perPage?: number
}

interface ListTransaction extends Transaction {
  category: Pick<Category, 'id' | 'name'>
  bankAccount: Pick<BankAccount, 'id' | 'name'>
}

export interface GetTransactionsResponse {
  data: ListTransaction[]
  meta: Meta
}

export const getTransactions = (
  { page, perPage, qs }: GetTransactionsRequest,
  config?: AxiosRequestConfig,
) => {
  const params = {
    perPage: perPage || DEFAULT_PER_PAGE,
    ...(page && {
      page,
    }),
    ...(qs && {
      qs,
    }),
  }

  const queryString = toQueryString(params)

  return api.get<GetTransactionsResponse>(`/transactions${queryString}`, config)
}
