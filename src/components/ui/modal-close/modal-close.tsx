import React from 'react'

import {
  ModalClose as MuiModalClose,
  ModalCloseProps as MuiModalCloseProps,
} from '@mui/joy'

interface ModalCloseProps extends MuiModalCloseProps {}

export const ModalClose: React.FC<ModalCloseProps> = ({ ...props }) => {
  return (
    <>
      <MuiModalClose {...props} />
    </>
  )
}
