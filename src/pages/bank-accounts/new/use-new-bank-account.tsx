import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { createBankAccount } from '@/repositories/bank-accounts/create-bank-account'

import { formValidation } from './form-config/form-validation'
import { FormValues } from './form-config/form-values'
import { initialFormState } from './form-config/initial-form-state'

export const useNewBankAccount = () => {
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
