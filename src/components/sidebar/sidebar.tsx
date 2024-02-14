import { Logo } from '@/components/logo/logo'
import { SidebarItems } from '@/components/sidebar/sidebar-items'
import { Drawer } from '@/components/ui/drawer/drawer'
import { IconButton } from '@/components/ui/icon-button/icon-button'
import { useSidebarStore } from '@/store/use-sidebar'
import { X } from 'lucide-react'
import React from 'react'

export const Sidebar: React.FC = () => {
  const { isOpen, setIsOpen } = useSidebarStore()

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Drawer isOpen={isOpen} onClose={handleClose}>
        <aside
          role="presentation"
          onClick={handleClose}
          className="overflow-y-auto h-screen bg-background min-w-[260px] w-[260px] border-0 border-r-[1px] border-slate-700"
        >
          <div className="flex py-2 px-2 justify-between items-center">
            <Logo />
            <IconButton hoverTitle="Fechar" onClick={handleClose}>
              <X />
            </IconButton>
          </div>
          <SidebarItems />
        </aside>
      </Drawer>

      <aside className="hidden sm:block overflow-y-auto bg-background min-w-[260px] w-[260px] border-0 border-r-[1px] border-slate-700">
        <div className="flex flex-col">
          <SidebarItems />
        </div>
      </aside>
    </>
  )
}
