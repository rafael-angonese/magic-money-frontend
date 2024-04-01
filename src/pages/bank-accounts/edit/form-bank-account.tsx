import React from 'react'

import { useMutation } from '@tanstack/react-query'
import { Controller, useFormContext } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button/button'
import { FormControl } from '@/components/ui/form-control/form-control'
import { FormLabel } from '@/components/ui/form-label/form-label'
import { FormMessage } from '@/components/ui/form-message/form-message'
import { GridItem } from '@/components/ui/grid/grid-item'
import { GridRow } from '@/components/ui/grid/grid-row'
import { Input } from '@/components/ui/input/input'
import { InputNumber } from '@/components/ui/input-number/input-number'
import { Loader } from '@/components/ui/loader/loader'
import { mutationKeys } from '@/constants/react-query-keys'
import {
  updateBankAccount,
  UpdateBankAccountRequest,
} from '@/repositories/bank-accounts/update-bank-account'

import { FormValues } from './form-config/form-values'

export const FormBankAccount: React.FC = () => {
  const methods = useFormContext<FormValues>()
  const navigate = useNavigate()
  const { id } = useParams()

  const {
    handleSubmit,
    formState: { errors },
  } = methods

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [mutationKeys.bankAccounts.update],
    mutationFn: (values: UpdateBankAccountRequest) =>
      updateBankAccount(id!, values),
  })

  const onSubmit = async (values: FormValues) => {
    try {
      await mutateAsync({
        name: values.name,
        balance: values.balance,
      })

      navigate('/bank-accounts')
    } catch (error) {}
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GridRow>
          <GridItem xs={12} sm={12} md={6} lg={3} xl={3}>
            <Controller
              control={methods.control}
              name="name"
              render={({ field }) => (
                <FormControl error={!!errors.name}>
                  <FormLabel htmlFor="name" required>
                    Nome da conta
                  </FormLabel>
                  <Input {...field} placeholder="digite o nome da conta" />
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
          <Button type="submit" color="primary" disabled={isPending}>
            <Loader isLoading={isPending} />
            Salvar
          </Button>
        </div>
      </form>
    </>
  )
}
