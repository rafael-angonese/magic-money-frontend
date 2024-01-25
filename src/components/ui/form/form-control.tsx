import { useFormField } from '@/components/ui/form/use-form-field'
import { Slot } from '@radix-ui/react-slot'
import React from 'react'

export interface FormControlProps
  extends React.ComponentPropsWithoutRef<typeof Slot> {
  isInvalid?: boolean
}

export const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  FormControlProps
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      isInvalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = 'FormControl'
