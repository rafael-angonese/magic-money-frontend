import { api } from '@/lib/api'
import { BankAccount } from '@/types/bank-acount'
import { AxiosRequestConfig } from 'axios'

export interface GetBankAccountByIdResponse {
  data: BankAccount
}

export const getBankAccountById = async (
  id: string,
  config?: AxiosRequestConfig,
) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
  return api.get<GetBankAccountByIdResponse>(`/bank-accounts/${id}`, config)
}
