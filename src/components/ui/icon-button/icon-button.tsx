import { ComponentPropsWithRef, forwardRef, ReactNode } from 'react'

import { Slot } from '@radix-ui/react-slot'

import { TooltipComponent } from '@/components/ui/tooltip'

export interface IconButtonProps extends ComponentPropsWithRef<'button'> {
  children: ReactNode
  hoverTitle: string
  asChild?: boolean
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, hoverTitle, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <TooltipComponent content={hoverTitle}>
        <Comp className={className} ref={ref} {...props} />
      </TooltipComponent>
    )
  },
)

IconButton.displayName = 'IconButton'
