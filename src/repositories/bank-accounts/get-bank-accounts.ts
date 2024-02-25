import { AxiosRequestConfig } from 'axios'

import { DEFAULT_PER_PAGE } from '@/constants/default-per-page'
import { api } from '@/lib/api'
import { BankAccount } from '@/types/bank-acount'
import { Meta } from '@/types/meta'
import toQueryString from '@/utils/to-query-string'

export interface GetBankAccountsRequest {
  qs?: string
  page?: number
  perPage?: number
  accountId: string
}

export interface GetBankAccountsResponse {
  data: BankAccount[]
  meta: Meta
}

export const getBankAccounts = (
  { page, perPage, qs, accountId }: GetBankAccountsRequest,
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
    ...(accountId && {
      accountId,
    }),
  }

  const queryString = toQueryString(params)

  return api.get<GetBankAccountsResponse>(
    `/bank-accounts${queryString}`,
    config,
  )
}
