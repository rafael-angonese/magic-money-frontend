import { create } from 'zustand'

import { TransactionType } from '@/types/transaction'

export interface State {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  transactionType: TransactionType | null
  setTransactionType: (value: TransactionType | null) => void
}

export const useNewTransactionStore = create<State>()((set) => ({
  isModalOpen: false,
  transactionType: null,
  setIsModalOpen: (value) => {
    set({
      isModalOpen: value,
    })
  },
  setTransactionType: (value) => {
    set({
      transactionType: value,
    })
  },
}))
