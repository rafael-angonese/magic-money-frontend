import React from 'react'

import {
  Dropdown as MuidropDown,
  DropdownProps as MuiDropdownProps,
} from '@mui/joy'

interface DropDownProps extends MuiDropdownProps {}

export const Dropdown: React.FC<DropDownProps> = ({ ...props }) => {
  return (
    <>
      <MuidropDown {...props} />
    </>
  )
}
