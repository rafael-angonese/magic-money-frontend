import { formValidation } from './form-config/form-validation'
import { FormValues } from './form-config/form-values'
import { initialFormState } from './form-config/initial-form-state'

import { createBankAccount } from '@/repositories/bank-accounts/create-bank-account'
import { useAccountStore } from '@/store/use-account-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const useNewBankAccount = () => {
  const { account } = useAccountStore()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: initialFormState,
    resolver: zodResolver(formValidation),
  })

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true)
      await createBankAccount({
        name: values.name,
        balance: values.balance,
        accountId: account!.id,
      })

      navigate('/bank-accounts')
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  return {
    methods,
    onSubmit,
    isLoading,
  }
}
