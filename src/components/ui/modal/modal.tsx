import React from 'react'

import { Modal as MuiModal, ModalProps as MuiModalProps } from '@mui/joy'

interface ModalProps extends MuiModalProps {}

export const Modal: React.FC<ModalProps> = ({ ...props }) => {
  return (
    <>
      <MuiModal {...props} />
    </>
  )
}
