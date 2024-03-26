import React from 'react'

import { LogOut, Menu } from 'lucide-react'

import { Logo } from '@/components/logo/logo'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/button/button'
import { IconButton } from '@/components/ui/icon-button/icon-button'
import { Tooltip } from '@/components/ui/tooltip'
import { useAuthStore } from '@/store/use-auth-store'
import { useSidebarStore } from '@/store/use-sidebar'

const Header: React.FC = () => {
  const { logout } = useAuthStore()
  const { isOpen, setIsOpen } = useSidebarStore()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Logo className="hidden sm:block" />

        <div className="block sm:hidden">
          <IconButton hoverTitle="Menu" onClick={() => setIsOpen(!isOpen)}>
            <Menu />
          </IconButton>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button
            onClick={() => {
              logout()
            }}
            size="icon"
            variant="ghost"
          >
            <Tooltip title="Sair">
              <LogOut className="h-5 w-5" />
            </Tooltip>
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default Header
