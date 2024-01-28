import { getBankAccountById } from '@/repositories/bank-accounts/get-bank-account-by-id'
import { formValidation } from './form-config/form-validation'
import { FormValues } from './form-config/form-values'
import { initialFormState } from './form-config/initial-form-state'

import {
  UpdateBankAccountRequest,
  updateBankAccount,
} from '@/repositories/bank-accounts/update-bank-account'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

export const useEditBankAccount = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['bank-account', id],
    queryFn: () => getBankAccountById(id!),
  })

  const { mutateAsync: updateBankAccountFn } = useMutation({
    mutationKey: ['update-bank-account'],
    mutationFn: (values: UpdateBankAccountRequest) =>
      updateBankAccount(id!, values),
  })

  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: initialFormState,
    resolver: zodResolver(formValidation),
  })

  const { reset } = methods

  const onSubmit = async (values: FormValues) => {
    try {
      await updateBankAccountFn({
        name: values.name,
        balance: values.balance,
      })

      navigate('/bank-accounts')
    } catch (error) {}
  }

  useEffect(() => {
    reset({
      name: data?.data.data.name,
      balance: data?.data.data.balance,
    })
  }, [data, reset])

  return {
    methods,
    onSubmit,
  }
}
