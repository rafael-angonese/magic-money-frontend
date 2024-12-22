import { create } from 'zustand'

export interface State {
  page: number
  setPage: (value: number) => void
  qs: string
  setQs: (value: string) => void
}

const INITIAL_STATE = {
  page: 1,
  qs: '',
}

export const useDocumentsFiltersStore = create<State>()((set) => ({
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
}))
