import React from 'react'

import { cnBase } from 'tailwind-variants'

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cnBase('text-sm font-medium text-error', className)}
      {...props}
    >
      {children}
    </p>
  )
})
FormMessage.displayName = 'FormMessage'
