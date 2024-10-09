import { AxiosRequestConfig } from 'axios'

import { api } from '@/lib/api'
import { BankAccount } from '@/types/bank-account'

export interface CreateBankAccountRequest {
  name: string
  balance: number
  accountId: string | number
}

export const createBankAccount = (
  data: CreateBankAccountRequest,
  config?: AxiosRequestConfig,
) => {
  return api.post<BankAccount>('/bank-accounts', data, config)
}
