import { AxiosRequestConfig } from 'axios'

import { api } from '@/lib/api'
import { BankAccount } from '@/types/bank-account'

export interface UpdateBankAccountRequest {
  name: string
  balance: number
}

export const updateBankAccount = (
  id: string,
  data: UpdateBankAccountRequest,
  config?: AxiosRequestConfig,
) => {
  return api.put<BankAccount>(`/bank-accounts/${id}`, data, config)
}
