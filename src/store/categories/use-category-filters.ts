import { create } from 'zustand'

export interface CategoryFiltersState {
  page: number
  qs: string
  setPage: (value: number) => void
  setQs: (value: string) => void
}

export const useCategoryFilters = create<CategoryFiltersState>()((set) => ({
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
