import { create } from 'zustand'

import { dayjs } from '@/lib/dayjs'

export interface State {
  page: number
  setPage: (value: number) => void
  qs: string
  setQs: (value: string) => void
  initialDateAt: Date | null
  finalDateAt: Date | null
  setInitialDateAt: (value: Date | null) => void
  setFinalDateAt: (value: Date | null) => void
  nextMonth: () => void
  previousMonth: () => void
}

const INITIAL_STATE = {
  page: 1,
  qs: '',
  initialDateAt: dayjs().startOf('month').toDate(),
  finalDateAt: dayjs().endOf('month').toDate(),
}

export const useDocumentsFiltersStore = create<State>()((set, get) => ({
  ...INITIAL_STATE,
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
}))
