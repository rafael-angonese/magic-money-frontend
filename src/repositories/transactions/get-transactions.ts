import { AxiosRequestConfig } from 'axios'

import { DEFAULT_PER_PAGE } from '@/constants/default-per-page'
import { api } from '@/lib/api'
import { Meta } from '@/types/meta'
import { Transaction } from '@/types/transaction'
import toQueryString from '@/utils/to-query-string'

export interface GetTransactionsRequest {
  qs?: string
  page?: number
  perPage?: number
}

export interface GetTransactionsResponse {
  data: Transaction[]
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
