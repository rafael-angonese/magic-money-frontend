import { create } from 'zustand'

import { dayjs } from '@/lib/dayjs'

export interface TransactionFiltersState {
  page: number
  qs: string
  setPage: (value: number) => void
  setQs: (value: string) => void
  initialDateAt: Date | null
  finalDateAt: Date | null
  setInitialDateAt: (value: Date | null) => void
  setFinalDateAt: (value: Date | null) => void
  nextMonth: () => void
  previousMonth: () => void
}

export const useTransactionFiltersStore = create<TransactionFiltersState>()(
  (set, get) => ({
    page: 1,
    qs: '',
    initialDateAt: dayjs().startOf('month').toDate(),
    finalDateAt: dayjs().endOf('month').toDate(),
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
    setInitialDateAt: (value) => {
      set({
        initialDateAt: value,
      })
    },
    setFinalDateAt: (value) => {
      set({
        finalDateAt: value,
      })
    },
    nextMonth: () => {
      const { initialDateAt } = get()
      const nextMonth = initialDateAt ? new Date(initialDateAt) : new Date()
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      set({
        initialDateAt: dayjs(nextMonth).startOf('month').toDate(),
        finalDateAt: dayjs(nextMonth).endOf('month').toDate(),
      })
    },
    previousMonth: () => {
      const { initialDateAt } = get()
      const prevMonth = dayjs(initialDateAt).subtract(1, 'month').toDate()
      set({
        initialDateAt: dayjs(prevMonth).startOf('month').toDate(),
        finalDateAt: dayjs(prevMonth).endOf('month').toDate(),
      })
    },
  }),
)
