import React from 'react'

import { cnBase } from 'tailwind-variants'

import { useFormField } from '@/components/ui/form/use-form-field'

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cnBase('text-sm text-muted', className)}
      {...props}
    />
  )
})
FormDescription.displayName = 'FormDescription'
