import { create } from 'zustand'

export interface State {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  id: number | string | null
  setId: (value: number | string | null) => void
}

const INITIAL_STATE = {
  isModalOpen: false,
  id: null,
}

export const useDeleteDocumentStore = create<State>()((set) => ({
  ...INITIAL_STATE,
  setId: (value) => {
    set({
      id: value,
    })
  },
  setIsModalOpen: (value) => {
    set({
      isModalOpen: value,
    })
  },
}))
