import React from 'react'

import {
  ModalDialog as MuiModalDialog,
  ModalDialogProps as MuiModalDialogProps,
} from '@mui/joy'

interface ModalDialogProps extends MuiModalDialogProps {}

export const ModalDialog: React.FC<ModalDialogProps> = ({ ...props }) => {
  return (
    <>
      <MuiModalDialog {...props} />
    </>
  )
}
