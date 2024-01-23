import { Fallback } from '@radix-ui/react-avatar'

import { forwardRef } from 'react'
import { tv } from 'tailwind-variants'

export const fallbackVariants = tv({
  base: 'flex h-full w-full items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800',
})

export const AvatarFallback = forwardRef<
  React.ElementRef<typeof Fallback>,
  React.ComponentPropsWithoutRef<typeof Fallback>
>(({ className, ...props }, ref) => (
  <Fallback
    ref={ref}
    className={fallbackVariants({
      className,
    })}
    {...props}
  />
))

AvatarFallback.displayName = Fallback.displayName
