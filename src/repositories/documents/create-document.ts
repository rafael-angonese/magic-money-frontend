import { AxiosRequestConfig } from 'axios'

import { api } from '@/lib/api'
import { DocumentType } from '@/types/document'

export interface CreateDocumentRequest {
  date: Date | string
  documentType: keyof typeof DocumentType
  file: File
}

export const createDocument = (
  data: CreateDocumentRequest,
  config?: AxiosRequestConfig,
) => {
  const formData = new FormData()

  formData.append('date', data.date.toString())
  formData.append('file', data.file)
  formData.append('documentType', data.documentType)

  return api.post<Document>('/documents', data, {
    ...config,
    headers: {
      ...config?.headers,
      'Content-Type': 'multipart/form-data',
    },
  })
}
