import { api } from '@/lib/api'
import { Category } from '@/types/category'
import { AxiosRequestConfig } from 'axios'

export interface GetCategoriesRequest {}

export interface GetCategoriesResponse {
  data: Category[]
}

export const getCategories = (
  _: GetCategoriesRequest,
  config?: AxiosRequestConfig,
) => {
  return api.get<GetCategoriesResponse>(`/categories`, config)
}
