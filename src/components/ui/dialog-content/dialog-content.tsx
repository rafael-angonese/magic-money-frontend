import React from 'react'

import {
  DialogContent as MuiDialogContent,
  DialogContentProps as MuiDialogContentProps,
} from '@mui/joy'

interface DialogContentProps extends MuiDialogContentProps {}

export const DialogContent: React.FC<DialogContentProps> = ({ ...props }) => {
  return (
    <>
      <MuiDialogContent {...props} />
    </>
  )
}
