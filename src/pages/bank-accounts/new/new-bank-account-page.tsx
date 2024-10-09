import React from 'react'

import { FormProvider } from 'react-hook-form'

import { Heading } from '@/components/ui/heading/heading'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'
import { useBankAccountForm } from '@/pages/bank-accounts/components/form/use-bank-account-form'

import { Form } from './form'

export const NewBankAccountPage: React.FC = () => {
  const methods = useBankAccountForm()

  return (
    <>
      <PageContentLayout>
        <div className="flex justify-between mb-12">
          <Heading as="h1">Nova Conta Bancaria</Heading>
        </div>

        <FormProvider {...methods}>
          <Form />
        </FormProvider>
      </PageContentLayout>
    </>
  )
}
