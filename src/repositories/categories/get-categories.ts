import { DEFAULT_PER_PAGE } from '@/constants/default-per-page'
import { api } from '@/lib/api'
import { Category } from '@/types/category'
import { Meta } from '@/types/meta'
import toQueryString from '@/utils/to-query-string'
import { AxiosRequestConfig } from 'axios'

export interface GetCategoriesRequest {
  qs?: string
  page?: number
  perPage?: number
}

export interface GetCategoriesResponse {
  data: Category[]
  meta: Meta
}

export const getCategories = (
  { page, perPage, qs }: GetCategoriesRequest,
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

  return api.get<GetCategoriesResponse>(`/categories${queryString}`, config)
}
