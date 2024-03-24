import React from 'react'

import { useIsFetching } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { Form } from '@/components/ui/form/form'
import { Heading } from '@/components/ui/heading/heading'
import { LinearProgress } from '@/components/ui/linear-progress/linear-progress'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'
import { FormBankAccount } from '@/pages/bank-accounts/edit/form-bank-account'

import { useEditBankAccount } from './use-edit-bank-account'

export const EditBankAccountPage: React.FC = () => {
  const { methods } = useEditBankAccount()
  const { id } = useParams()

  const isFetching = useIsFetching({ queryKey: ['bank-account', id] })

  if (isFetching) {
    return (
      <div>
        <LinearProgress isLoading />
      </div>
    )
  }

  return (
    <>
      <PageContentLayout>
        <div className="flex justify-between mb-12">
          <Heading as="h1">Editando Conta Bancaria</Heading>
        </div>

        <Form.Provider {...methods}>
          <FormBankAccount />
        </Form.Provider>
      </PageContentLayout>
    </>
  )
}
