import { create } from 'zustand'

import { StorageKeys } from '@/constants/storage-keys'
import { api } from '@/lib/api'
import { getUserMe, GetUserMeResponse } from '@/repositories/users/me-user'
import handlingRequestError from '@/utils/handling-request-error'
import Storage from '@/utils/storage'

interface SignInProps {
  refreshToken: string
  token: string
}

export interface AuthStore {
  isLoadingCheck: boolean
  isAuthenticated: boolean
  token: string | null
  refreshToken: string | null
  user: GetUserMeResponse | null
  setToken: (value: string) => void
  setRefreshToken: (value: string) => void
  signIn: (values: SignInProps) => void
  checkAuth: () => Promise<void>
  logout: () => void
  reset: () => void
}

const INITIAL_STATE = {
  isLoadingCheck: true,
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  user: null,
}

const RESET_INITIAL_STATE = {
  ...INITIAL_STATE,
  isLoadingCheck: false,
}

export const useAuthStore = create<AuthStore>((set) => ({
  ...INITIAL_STATE,
  setToken: (token: string) => set({ token }),
  setRefreshToken: (refreshToken: string) => set({ refreshToken }),
  signIn: ({ refreshToken, token }) => {
    Storage.setItem(StorageKeys.TOKEN, token)
    Storage.setItem(StorageKeys.REFRESH_TOKEN, refreshToken)
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    set({
      token,
      refreshToken,
      isAuthenticated: true,
    })
  },
  logout: () => {
    Storage.removeItem(StorageKeys.TOKEN)
    Storage.removeItem(StorageKeys.REFRESH_TOKEN)
    set({
      ...RESET_INITIAL_STATE,
    })
  },
  checkAuth: async () => {
    const refreshToken = Storage.getItem(StorageKeys.TOKEN)
    const token = Storage.getItem(StorageKeys.TOKEN)
    if (token && refreshToken) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`

      try {
        const { data } = await getUserMe()

        set({
          user: data,
          token,
          refreshToken,
          isAuthenticated: true,
          isLoadingCheck: false,
        })
        return
      } catch (error) {
        handlingRequestError(error)
        set({ ...RESET_INITIAL_STATE })
      }

      return
    }
    set({ ...RESET_INITIAL_STATE })
  },
  reset: () => {
    set({ ...RESET_INITIAL_STATE })
    Storage.removeItem(StorageKeys.TOKEN)
    Storage.removeItem(StorageKeys.REFRESH_TOKEN)
  },
}))
