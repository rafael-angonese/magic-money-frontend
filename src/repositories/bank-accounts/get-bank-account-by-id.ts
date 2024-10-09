import { AxiosRequestConfig } from 'axios'

import { api } from '@/lib/api'
import { BankAccount } from '@/types/bank-account'

export const getBankAccountById = (id: string, config?: AxiosRequestConfig) => {
  return api.get<BankAccount>(`/bank-accounts/${id}`, config)
}
