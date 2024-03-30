import React from 'react'

import {
  DialogTitle as MuiDialogTitle,
  DialogTitleProps as MuiDialogTitleProps,
} from '@mui/joy'

interface DialogTitleProps extends MuiDialogTitleProps {}

export const DialogTitle: React.FC<DialogTitleProps> = ({ ...props }) => {
  return (
    <>
      <MuiDialogTitle {...props} />
    </>
  )
}
