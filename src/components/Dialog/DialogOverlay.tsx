import { Overlay } from '@radix-ui/react-dialog'
import React from 'react'
import { cnBase } from 'tailwind-variants'

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof Overlay>,
  React.ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => (
  <Overlay
    ref={ref}
    className={cnBase(
      'fixed inset-0 z-50 bg-white/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-slate-950/80',
      className,
    )}
    {...props}
  />
))
DialogOverlay.displayName = Overlay.displayName
