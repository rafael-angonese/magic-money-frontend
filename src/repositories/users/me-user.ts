import { AxiosRequestConfig } from 'axios'

import { api } from '@/lib/api'
import { Account } from '@/types/account'
import { User } from '@/types/user'

export interface GetUserMeResponse extends User {
  account: Account
}

export const getUserMe = (config?: AxiosRequestConfig) => {
  return api.get<GetUserMeResponse>('/auth/me', config)
}
