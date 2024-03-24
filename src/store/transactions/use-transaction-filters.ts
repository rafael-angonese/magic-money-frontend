import { create } from 'zustand'

export interface TransactionFiltersState {
  page: number
  qs: string
  setPage: (value: number) => void
  setQs: (value: string) => void
}

export const useTransactionFilters = create<TransactionFiltersState>()(
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
