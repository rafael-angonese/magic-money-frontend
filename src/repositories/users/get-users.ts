import { DEFAULT_PER_PAGE } from '@/constants/default-per-page'
import { api } from '@/lib/api'
import { Meta } from '@/types/meta'
import { User } from '@/types/user'
import toQueryString from '@/utils/to-query-string'
import { AxiosRequestConfig } from 'axios'

export interface GetUsersRequest {
  qs?: string
  page?: number
  perPage?: number
}

export interface GetUsersResponse {
  data: User[]
  meta: Meta
}

export const getUsers = (
  { page, perPage, qs }: GetUsersRequest,
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
  }

  const queryString = toQueryString(params)

  return api.get<GetUsersResponse>(`/users${queryString}`, config)
}
