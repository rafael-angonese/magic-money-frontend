import { AxiosRequestConfig } from 'axios'

import { api } from '@/lib/api'

export const deleteDocument = (
  id: number | string,
  config?: AxiosRequestConfig,
) => {
  return api.delete(`/documents/${id}`, config)
}
