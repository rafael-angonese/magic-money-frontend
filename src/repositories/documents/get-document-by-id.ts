import { AxiosRequestConfig } from 'axios'

import { api } from '@/lib/api'
import { Document } from '@/types/document'

export const getDocumentById = (id: string, config?: AxiosRequestConfig) => {
  return api.get<Document>(`/documents/${id}`, config)
}
