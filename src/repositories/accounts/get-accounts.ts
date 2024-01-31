import { DEFAULT_PER_PAGE } from '@/constants/default-per-page'
import { api } from '@/lib/api'
import { Account } from '@/types/account'
import { Meta } from '@/types/meta'
import toQueryString from '@/utils/to-query-string'
import { AxiosRequestConfig } from 'axios'

export interface GetAccountsRequest {
  qs?: string
  page?: number
  perPage?: number
}

export interface GetAccountsResponse {
  data: Account[]
  meta: Meta
}

export const getAccounts = (
  { page, perPage, qs }: GetAccountsRequest,
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

  return api.get<GetAccountsResponse>(`/accounts${queryString}`, config)
}
