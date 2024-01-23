import { Header, Trigger } from '@radix-ui/react-accordion'
import React from 'react'
import { cnBase } from 'tailwind-variants'

export const AccordionHeader = React.forwardRef<
  React.ElementRef<typeof Header>,
  React.ComponentPropsWithoutRef<typeof Header>
>(({ className, children, ...props }, ref) => (
  <Header {...props} ref={ref} className={cnBase('flex', className)}>
    {children}
  </Header>
))
AccordionHeader.displayName = Trigger.displayName
