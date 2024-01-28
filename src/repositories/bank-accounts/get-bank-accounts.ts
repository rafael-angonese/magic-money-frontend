import { api } from '@/lib/api'
import { BankAccount } from '@/types/bank-acount'
import toQueryString from '@/utils/to-query-string'
import { AxiosRequestConfig } from 'axios'

export interface GetBankAccountsRequest {
  accountId: string
}

export interface GetBankAccountsResponse {
  data: BankAccount[]
}

export const getBankAccounts = (
  { accountId }: GetBankAccountsRequest,
  config?: AxiosRequestConfig,
) => {
  const params = {
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
