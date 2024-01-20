import { api } from '@/lib/api'
import { AxiosRequestConfig } from 'axios'

interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  refreshToken: string
}

export const login = (data: LoginRequest, config?: AxiosRequestConfig) => {
  return api.post<LoginResponse>('/auth', data, config)
}
