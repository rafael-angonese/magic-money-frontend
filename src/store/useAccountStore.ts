import { StorageKeys } from '@/constants/storage-keys'
import { Account } from '@/types/account'
import Storage from '@/utils/storage'
import { create } from 'zustand'

export interface AccountStore {
  account: Account | null
  setAccount: (value: Account | null) => void
  reset: () => void
}

const INITIAL_STATE = {
  account: Storage.getItem(StorageKeys.ACCOUNT) || null,
}

export const useAccountStore = create<AccountStore>((set) => ({
  ...INITIAL_STATE,
  setAccount: (account) => {
    set({ account })
    Storage.setItem(StorageKeys.ACCOUNT, account)
  },
  reset: () => {
    set({ account: null })
    Storage.removeItem(StorageKeys.ACCOUNT)
  },
}))
