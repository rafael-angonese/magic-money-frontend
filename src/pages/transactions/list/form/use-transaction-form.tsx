import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { formValidation } from './form-config/form-validation'
import { FormValues } from './form-config/form-values'
import { initialFormState } from './form-config/initial-form-state'

export const useTransactionForm = () => {
  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: initialFormState,
    resolver: zodResolver(formValidation),
  })

  return methods
}
