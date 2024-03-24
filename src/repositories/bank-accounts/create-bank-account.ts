import { AxiosRequestConfig } from 'axios'

import { api } from '@/lib/api'
import { BankAccount } from '@/types/bank-acount'

export interface CreateBankAccountRequest {
  name: string
  balance: number
}

export interface CreateBankAccountResponse {
  data: BankAccount
}

export const createBankAccount = (
  data: CreateBankAccountRequest,
  config?: AxiosRequestConfig,
) => {
  return api.post<CreateBankAccountResponse>('/bank-accounts', data, config)
}
