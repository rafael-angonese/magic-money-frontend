import { AxiosRequestConfig } from 'axios'

import { DEFAULT_PER_PAGE } from '@/constants/default-per-page'
import { api } from '@/lib/api'
import { Document } from '@/types/document'
import { Meta } from '@/types/meta'
import toQueryString from '@/utils/to-query-string'

export interface GetDocumentsRequest {
  qs?: string
  page?: number
  perPage?: number
  initialDateAt?: Date | null
  finalDateAt?: Date | null
}

export interface GetDocumentsResponse {
  data: Document[]
  meta: Meta
}

export const getDocuments = (
  { page, perPage, qs, initialDateAt, finalDateAt }: GetDocumentsRequest,
  config?: AxiosRequestConfig,
) => {
  const params = {
    perPage: perPage || DEFAULT_PER_PAGE,
    ...(page && {
      page,
    }),
    ...(qs && {
      qs,
    }),
    ...(initialDateAt && {
      initialDateAt: initialDateAt.toISOString(),
    }),
    ...(finalDateAt && {
      finalDateAt: finalDateAt.toISOString(),
    }),
  }

  const queryString = toQueryString(params)

  return api.get<GetDocumentsResponse>(`/documents${queryString}`, config)
}
