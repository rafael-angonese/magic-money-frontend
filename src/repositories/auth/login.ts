import { AxiosRequestConfig } from 'axios'

import { api } from '@/lib/api'

interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  refreshToken: string
}

export const login = (data: LoginRequest, config?: AxiosRequestConfig) => {
  return api.post<LoginResponse>('/auth/login', data, config)
}
