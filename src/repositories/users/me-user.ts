import { AxiosRequestConfig } from 'axios'

import { api } from '@/lib/api'
import { User } from '@/types/user'

export interface GetUserMeResponse {
  data: User
}

export const getUserMe = (config?: AxiosRequestConfig) => {
  return api.get<GetUserMeResponse>('/users/me', config)
}
