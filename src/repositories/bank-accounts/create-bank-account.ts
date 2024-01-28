import { api } from '@/lib/api'
import { BankAccount } from '@/types/bank-acount'
import { AxiosRequestConfig } from 'axios'

export interface CreateBankAccountRequest {
  name: string
  balance: number
  accountId: string
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
