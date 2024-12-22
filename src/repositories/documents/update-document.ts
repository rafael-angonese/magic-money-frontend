import { AxiosRequestConfig } from 'axios'

import { api } from '@/lib/api'
import { Document, DocumentType } from '@/types/document'

export interface UpdateDocumentRequest {
  date: Date | string
  documentType: keyof typeof DocumentType
}

export const updateDocument = (
  id: string,
  data: UpdateDocumentRequest,
  config?: AxiosRequestConfig,
) => {
  return api.put<Document>(`/documents/${id}`, data, config)
}
