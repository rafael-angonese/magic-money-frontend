import React from 'react'

import { NavLink } from '@/components/Header/NavLink'
import { Button } from '@/components/ui/Button/Button'
import { Divider } from '@/components/ui/Divider/Divider'
import { ThemeToggle } from '@/components/ui/Theme/ThemeToggle'
import { Tooltip } from '@/components/ui/Tooltip'
import { useAccountStore } from '@/store/useAccountStore'
import { useAuthStore } from '@/store/useAuthStore'
import {
  ArrowLeftRight,
  CircleUserRound,
  Home,
  Landmark,
  LogOut,
  PiggyBank,
  Users,
  Wind,
} from 'lucide-react'

const Header: React.FC = () => {
  const { logout } = useAuthStore()
  const { account, reset } = useAccountStore()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <PiggyBank className="h-8 w-8" />

        {account && (
          <>
            <Divider
              color="secondary"
              orientation="vertical"
              className="h-8 w-[2px] bg-gray-500 dark:bg-gray-500"
            />
            <nav className="flex items-center space-x-4 lg:space-x-6">
              <NavLink to="/">
                <Home className="h-4 w-4" />
                Início
              </NavLink>
              <NavLink to="/transactions">
                <ArrowLeftRight className="h-4 w-4" />
                Transações
              </NavLink>
              <NavLink to="/users">
                <Users className="h-4 w-4" />
                Usuários
              </NavLink>
              <NavLink to="/bank-accounts">
                <Landmark className="h-4 w-4" />
                Contas Bancarias
              </NavLink>
              <NavLink to="/accounts">
                <CircleUserRound className="h-4 w-4" />
                Contas
              </NavLink>
              <NavLink to="/categories">
                <Wind className="h-4 w-4" />
                Categorias
              </NavLink>
            </nav>
          </>
        )}

        <div className="ml-auto flex items-center gap-2">
          <Button
            onClick={() => {
              logout()
              reset()
            }}
            size="icon"
            variant="ghost"
          >
            <Tooltip.Component content="Sair">
              <LogOut className="h-5 w-5" />
            </Tooltip.Component>
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default Header
