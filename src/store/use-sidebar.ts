import { create } from 'zustand'

export interface SidebarStore {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export const useSidebarStore = create<SidebarStore>()((set) => ({
  isOpen: false,
  setIsOpen: (value) => {
    set({
      isOpen: value,
    })
  },
}))
