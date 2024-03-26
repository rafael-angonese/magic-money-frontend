import React from 'react'

import {
  FormLabel as MuiFormLabel,
  FormLabelProps as MuiFormLabelProps,
} from '@mui/joy'
import { tv, VariantProps } from 'tailwind-variants'

export const formLabelVariants = tv({
  base: ['mb-1 text-sm font-medium leading-none'],
  variants: {
    error: {
      true: 'text-red-500  dark:text-red-500',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
})
interface FormLabelProps
  extends MuiFormLabelProps,
    VariantProps<typeof formLabelVariants> {
  required?: boolean
}

export const FormLabel: React.FC<FormLabelProps> = ({
  children,
  required,
  className,
  ...props
}) => {
  return (
    <>
      <MuiFormLabel {...props} className={formLabelVariants({ className })}>
        {children}
        {required && <span className="text-red-500">&nbsp;*</span>}
      </MuiFormLabel>
    </>
  )
}
