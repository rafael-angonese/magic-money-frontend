import { api } from '@/lib/api'
import { AxiosRequestConfig } from 'axios'

export const deleteBankAccount = (id: string, config?: AxiosRequestConfig) => {
  return api.delete(`/bank-accounts/${id}`, config)
}
