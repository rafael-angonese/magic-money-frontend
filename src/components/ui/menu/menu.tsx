import React from 'react'

import { Menu as MuiMenu, MenuProps as MuiMenuProps } from '@mui/joy'

interface MenuProps extends MuiMenuProps {}

export const Menu: React.FC<MenuProps> = ({ ...props }) => {
  return (
    <>
      <MuiMenu {...props} />
    </>
  )
}
