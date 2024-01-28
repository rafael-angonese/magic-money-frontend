import { api } from '@/lib/api'
import { BankAccount } from '@/types/bank-acount'
import { AxiosRequestConfig } from 'axios'

export interface UpdateBankAccountRequest {
  name: string
  balance: number
}

export interface UpdateBankAccountResponse {
  data: BankAccount
}

export const updateBankAccount = (
  id: string,
  data: UpdateBankAccountRequest,
  config?: AxiosRequestConfig,
) => {
  return api.put<UpdateBankAccountResponse>(
    `/bank-accounts/${id}`,
    data,
    config,
  )
}
