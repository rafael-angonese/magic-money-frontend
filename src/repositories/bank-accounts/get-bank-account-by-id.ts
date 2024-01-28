import { api } from '@/lib/api'
import { BankAccount } from '@/types/bank-acount'
import { AxiosRequestConfig } from 'axios'

export interface GetBankAccountByIdResponse {
  data: BankAccount
}

export const getBankAccountById = (id: string, config?: AxiosRequestConfig) => {
  return api.get<GetBankAccountByIdResponse>(`/bank-accounts/${id}`, config)
}
