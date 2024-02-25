import React, { ComponentProps, forwardRef } from 'react'

import { cnBase } from 'tailwind-variants'

import { FormItemContext } from '@/components/ui/form/form-item-context'

export const FormItem = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    const id = React.useId()

    return (
      <FormItemContext.Provider
        value={{
          id,
        }}
      >
        <div ref={ref} className={cnBase('space-y-2', className)} {...props} />
      </FormItemContext.Provider>
    )
  },
)
FormItem.displayName = 'FormItem'
