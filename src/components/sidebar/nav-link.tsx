import React from 'react'
import {
  NavLink as RouterDomNavLink,
  NavLinkProps as RouterDomNavLinkProps,
} from 'react-router-dom'

export interface NavLinkProps extends RouterDomNavLinkProps {}

export const NavLink: React.FC<NavLinkProps> = ({ ...props }) => {
  return (
    <>
      <RouterDomNavLink
        {...props}
        className="flex items-center gap-2 no-underline px-4 py-4 hover:bg-blue-700 transition-colors duration-700 hover:text-foreground aria-[current=page]:bg-blue-600 aria-[current=page]:text-white"
      />
    </>
  )
}
