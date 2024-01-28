import { env } from '@/env'
import isDev from '@/utils/is-dev'
import { sleep } from '@/utils/sleep'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(async (response) => {
  if (isDev()) {
    await sleep()
  }
  return response
})
