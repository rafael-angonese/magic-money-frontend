import { FormControl } from '@/components/ui/Form/FormControl'
import { FormDescription } from '@/components/ui/Form/FormDescription'
import { FormField } from '@/components/ui/Form/FormField'
import { FormItem } from '@/components/ui/Form/FormItem'
import { FormLabel } from '@/components/ui/Form/FormLabel'
import { FormMessage } from '@/components/ui/Form/FormMessage'
import { useFormField } from '@/components/ui/Form/useFormField'
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
