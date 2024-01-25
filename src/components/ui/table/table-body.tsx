import React from 'react'
import { tv } from 'tailwind-variants'

export const bodyVariants = tv({
  base: '[&_tr:last-child]:border-0',
})

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={bodyVariants({ className })} {...props} />
))

TableBody.displayName = 'TableBody'
