import React from 'react'

import { Controller, useFormContext } from 'react-hook-form'

import { FormControl } from '@/components/ui/form-control/form-control'
import { FormLabel } from '@/components/ui/form-label/form-label'
import { FormMessage } from '@/components/ui/form-message/form-message'
import { GridItem } from '@/components/ui/grid/grid-item'
import { GridRow } from '@/components/ui/grid/grid-row'
import { Input } from '@/components/ui/input/input'
import { InputNumber } from '@/components/ui/input-number/input-number'

import { FormValues } from './form-config/form-values'

export const FormFields: React.FC = () => {
  const methods = useFormContext<FormValues>()

  const {
    formState: { errors },
  } = methods

  return (
    <>
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
                  onValueChange={(values) => field.onChange(values.floatValue)}
                  placeholder="Digite o saldo"
                />
                <FormMessage>{errors?.balance?.message}</FormMessage>
              </FormControl>
            )}
          />
        </GridItem>
      </GridRow>
    </>
  )
}
