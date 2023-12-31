'use client'
import { Item } from '@radix-ui/react-accordion'
import React from 'react'
import { cnBase } from 'tailwind-variants'

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item>
>(({ className, ...props }, ref) => (
  <Item ref={ref} className={cnBase('border-b', className)} {...props} />
))
AccordionItem.displayName = Item.displayName
