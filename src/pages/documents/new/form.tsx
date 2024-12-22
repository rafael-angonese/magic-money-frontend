import React from 'react'

import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button/button'
import { Loader } from '@/components/ui/loader/loader'
import { createDocument } from '@/repositories/documents/create-document'
import handlingRequestError from '@/utils/handling-request-error'

import { FormValues } from '../components/form/form-config/form-values'
import { FormFields } from '../components/form/form-fields'

export const Form: React.FC = () => {
  const navigate = useNavigate()

  const methods = useFormContext<FormValues>()

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (values: FormValues) => {
    try {
      await createDocument({
        date: values.date,
        documentType: values.documentType.value,
        file: values.file!,
      })

      navigate('/documents')
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
