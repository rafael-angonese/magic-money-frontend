import { create } from 'zustand'

export interface BankAccountFiltersState {
  page: number
  qs: string
  setPage: (value: number) => void
  setQs: (value: string) => void
}

export const useBankAccountFilters = create<BankAccountFiltersState>()(
  (set) => ({
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
  }),
)
