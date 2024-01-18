import { FormControl } from '@/components/Form/FormControl'
import { FormDescription } from '@/components/Form/FormDescription'
import { FormField } from '@/components/Form/FormField'
import { FormItem } from '@/components/Form/FormItem'
import { FormLabel } from '@/components/Form/FormLabel'
import { FormMessage } from '@/components/Form/FormMessage'
import { useFormField } from '@/components/Form/useFormField'
import { FormProvider } from 'react-hook-form'

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
