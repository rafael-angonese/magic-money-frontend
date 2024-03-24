import { create } from 'zustand'

export interface UserFiltersState {
  page: number
  qs: string
  setPage: (value: number) => void
  setQs: (value: string) => void
}

export const useUserFilters = create<UserFiltersState>()((set) => ({
  page: 1,
  qs: '',
  setPage: (value) => {
    set({
      page: value,
    })
  },
  setQs: (value) => {
    set({
      qs: value,
    })
  },
}))
