import { ComponentPropsWithRef, forwardRef, ReactNode } from 'react'

import { Slot } from '@radix-ui/react-slot'

import { Tooltip } from '@/components/ui/tooltip/tooltip'

export interface IconButtonProps extends ComponentPropsWithRef<'button'> {
  children: ReactNode
  hoverTitle: string
  asChild?: boolean
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, hoverTitle, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Tooltip title={hoverTitle}>
        <Comp className={className} ref={ref} {...props} />
      </Tooltip>
    )
  },
)

IconButton.displayName = 'IconButton'
