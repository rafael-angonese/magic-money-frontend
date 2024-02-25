import { ComponentProps, forwardRef } from 'react'

import { cnBase } from 'tailwind-variants'

export interface InputGroupProps extends ComponentProps<'div'> {}

export const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cnBase('relative', className)} ref={ref} {...props} />
    )
  },
)

InputGroup.displayName = 'InputGroup'
