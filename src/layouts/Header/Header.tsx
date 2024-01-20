import React from 'react'

import { Divider } from '@/components/Divider/Divider'
import { NavLink } from '@/layouts/Header/NavLink'
import {
  ArrowLeftRight,
  CircleUserRound,
  Home,
  Landmark,
  PiggyBank,
  Pizza,
  Users,
  Wind,
} from 'lucide-react'
import { ThemeToggle } from '@/components/Theme/ThemeToggle'

const Header: React.FC = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <PiggyBank className="h-8 w-8" />

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

        <div className="ml-auto flex items-center gap-2">
          <Pizza className="h-6 w-6" />

          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default Header
