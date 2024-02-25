import { AxiosRequestConfig } from 'axios'

import { api } from '@/lib/api'

export const deleteBankAccount = (id: string, config?: AxiosRequestConfig) => {
  return api.delete(`/bank-accounts/${id}`, config)
}
