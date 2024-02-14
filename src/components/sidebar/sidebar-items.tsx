import { NavLink } from '@/components/sidebar/nav-link'
import {
  ArrowLeftRight,
  CircleUserRound,
  Home,
  Landmark,
  Users,
  Wind,
} from 'lucide-react'
import React from 'react'

export const SidebarItems: React.FC = () => {
  return (
    <>
      <div className="flex flex-col">
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
      </div>
    </>
  )
}
