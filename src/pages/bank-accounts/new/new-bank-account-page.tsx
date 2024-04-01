import React from 'react'

import { Controller, FormProvider } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { FormControl } from '@/components/ui/form-control/form-control'
import { FormLabel } from '@/components/ui/form-label/form-label'
import { FormMessage } from '@/components/ui/form-message/form-message'
import { GridItem } from '@/components/ui/grid/grid-item'
import { GridRow } from '@/components/ui/grid/grid-row'
import { Heading } from '@/components/ui/heading/heading'
import { Input } from '@/components/ui/input/input'
import { InputNumber } from '@/components/ui/input-number/input-number'
import { Loader } from '@/components/ui/loader/loader'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'

import { useNewBankAccount } from './use-new-bank-account'

export const NewBankAccountPage: React.FC = () => {
  const { isLoading, methods, onSubmit } = useNewBankAccount()

  const {
    handleSubmit,
    formState: { errors },
  } = methods

  return (
    <>
      <PageContentLayout>
        <div className="flex justify-between mb-12">
          <Heading as="h1">Nova Conta Bancaria</Heading>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <GridRow>
              <GridItem xs={12} sm={12} md={6} lg={3} xl={3}>
                <Controller
                  control={methods.control}
                  name="name"
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel required>Nome da conta</FormLabel>

                      <Input {...field} placeholder="Digite o nome da conta" />

                      <FormMessage>{errors?.name?.message}</FormMessage>
                    </FormControl>
                  )}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6} lg={3} xl={3}>
                <Controller
                  control={methods.control}
                  name="balance"
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel required>Saldo</FormLabel>

                      <InputNumber
                        value={field.value}
                        onValueChange={(values) =>
                          field.onChange(values.floatValue)
                        }
                        placeholder="Digite o saldo"
                      />

                      <FormMessage>{errors?.balance?.message}</FormMessage>
                    </FormControl>
                  )}
                />
              </GridItem>
            </GridRow>
            <div className="flex justify-start mt-8">
              <Button type="submit" color="primary" disabled={isLoading}>
                <Loader isLoading={isLoading} />
                Salvar
              </Button>
            </div>
          </form>
        </FormProvider>
      </PageContentLayout>
    </>
  )
}
