import React from 'react'

import {
  MenuButton as MuiMenuButton,
  MenuButtonProps as MuiMenuButtonProps,
} from '@mui/joy'

interface MenuButtonProps extends MuiMenuButtonProps {}

export const MenuButton: React.FC<MenuButtonProps> = ({ ...props }) => {
  return (
    <>
      <MuiMenuButton {...props} />
    </>
  )
}
