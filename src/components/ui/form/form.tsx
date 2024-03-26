import { FormProvider } from 'react-hook-form'

import { FormLabel } from '@/components/ui/form-label/form-label'
import { FormControl } from '@/components/ui/form/form-control'
import { FormDescription } from '@/components/ui/form/form-description'
import { FormField } from '@/components/ui/form/form-field'
import { FormItem } from '@/components/ui/form/form-item'
import { FormMessage } from '@/components/ui/form/form-message'
import { useFormField } from '@/components/ui/form/use-form-field'

export const Form = {
  useFormField,
  Provider: FormProvider,
  Field: FormField,
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  Message: FormMessage,
}
