import { api } from '@/lib/api'
import { Account } from '@/types/account'
import { AxiosRequestConfig } from 'axios'

export interface GetAccountsResponse {
  data: Account[]
}

export const getAccounts = (qs?: string, config?: AxiosRequestConfig) => {
  return api.get<GetAccountsResponse>(`/accounts${qs}`, config)
}
