import React from 'react'

import {
  MenuItem as MuiMenuItem,
  MenuItemProps as MuiMenuItemProps,
} from '@mui/joy'

interface MenuItemProps extends MuiMenuItemProps {}

export const MenuItem: React.FC<MenuItemProps> = ({ ...props }) => {
  return (
    <>
      <MuiMenuItem {...props} />
    </>
  )
}
