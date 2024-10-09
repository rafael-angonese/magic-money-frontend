import React, { useEffect } from 'react'

import { FormProvider } from 'react-hook-form'

import { Heading } from '@/components/ui/heading/heading'
import { LinearProgress } from '@/components/ui/linear-progress/linear-progress'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'
import { useBankAccountForm } from '@/pages/bank-accounts/components/form/use-bank-account-form'
import { useGetBankAccount } from '@/pages/bank-accounts/hooks/use-get-bank-account'

import { Form } from './form'

export const EditBankAccountPage: React.FC = () => {
  const methods = useBankAccountForm()

  const { isLoading, data } = useGetBankAccount()

  const { reset } = methods

  const bankAccount = data?.data || null

  useEffect(() => {
    if (!bankAccount) return
    reset({
      name: bankAccount.name,
      balance: bankAccount.balance,
    })
  }, [bankAccount, reset])

  if (isLoading) {
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

        <FormProvider {...methods}>
          <Form />
        </FormProvider>
      </PageContentLayout>
    </>
  )
}
