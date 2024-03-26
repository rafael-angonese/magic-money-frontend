import React from 'react'

import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
} from '@mui/joy'

interface TooltipProps extends MuiTooltipProps {}

export const Tooltip: React.FC<TooltipProps> = ({ children, ...props }) => {
  return (
    <>
      <MuiTooltip {...props}>{children}</MuiTooltip>
    </>
  )
}
