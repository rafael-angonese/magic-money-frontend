import { FormItemContext } from '@/components/Form/FormItemContext'
import React, { ComponentProps, forwardRef } from 'react'
import { cnBase } from 'tailwind-variants'

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
