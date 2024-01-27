import { HTMLAttributes, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

export const headVariants = tv({
  base: '[&_tr]:border-b',
})

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={headVariants({ className })} {...props} />
))

TableHeader.displayName = 'TableHeader'
