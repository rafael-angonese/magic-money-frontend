import React from 'react'

import { useFormContext } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button/button'
import { Loader } from '@/components/ui/loader/loader'
import { updateBankAccount } from '@/repositories/bank-accounts/update-bank-account'
import handlingRequestError from '@/utils/handling-request-error'

import { FormValues } from '../components/form/form-config/form-values'
import { FormFields } from '../components/form/form-fields'

export const Form: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const methods = useFormContext<FormValues>()

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (values: FormValues) => {
    try {
      await updateBankAccount(id!, {
        name: values.name,
        balance: values.balance,
      })

      navigate('/bank-accounts')
    } catch (error) {
      handlingRequestError(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFields />
        <div className="flex justify-start mt-8">
          <Button type="submit" color="primary" disabled={isSubmitting}>
            <Loader isLoading={isSubmitting} />
            Salvar
          </Button>
        </div>
      </form>
    </>
  )
}
