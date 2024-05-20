import { AxiosRequestConfig } from 'axios'

import { api } from '@/lib/api'
import toQueryString from '@/utils/to-query-string'

export interface GetPresignedUrlRequest {
  fileExtension: string
}

export interface GetPresignedUrlResponse {
  data: {
    presignedUrl: string
    fileKey: string
  }
}

export const getPresignedUrl = (
  { fileExtension }: GetPresignedUrlRequest,
  config?: AxiosRequestConfig,
) => {
  const params = {
    fileExtension,
  }

  const queryString = toQueryString(params)

  return api.get<GetPresignedUrlResponse>(
    `/presigned-url${queryString}`,
    config,
  )
}
