import { forwardRef } from 'react'

import { Input as MuiInput, InputProps as MuiInputProps } from '@mui/joy'
import { cnBase } from 'tailwind-variants'

export interface InputProps extends MuiInputProps {}

export const Input = forwardRef<HTMLDivElement, InputProps>(
  ({ className, ...props }, ref) => {
    return <MuiInput className={cnBase(className)} ref={ref} {...props} />
  },
)

Input.displayName = 'Input'
