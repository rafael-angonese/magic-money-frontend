import { AxiosRequestConfig } from 'axios'

import { api } from '@/lib/api'
import { BankAccount } from '@/types/bank-acount'

export interface GetBankAccountByIdResponse {
  data: BankAccount
}

export const getBankAccountById = (id: string, config?: AxiosRequestConfig) => {
  return api.get<GetBankAccountByIdResponse>(`/bank-accounts/${id}`, config)
}
