import * as React from 'react'

import * as LabelPrimitive from '@radix-ui/react-label'
import { tv, VariantProps } from 'tailwind-variants'

export const labelVariants = tv({
  base: [
    'text-sm font-medium leading-none',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  ],
  variants: {
    isInvalid: {
      true: 'text-red-500  dark:text-red-500',
    },
  },
})

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  required?: boolean
}

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, isInvalid, required, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={labelVariants({ isInvalid, className })}
    {...props}
  >
    {children}
    {required && <span className="text-red-500">&nbsp;*</span>}
  </LabelPrimitive.Root>
))

Label.displayName = LabelPrimitive.Root.displayName
