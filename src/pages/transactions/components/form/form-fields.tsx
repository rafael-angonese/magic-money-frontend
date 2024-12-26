import React from 'react'

import { Controller, useFormContext } from 'react-hook-form'

import { InputSelectBankAccount } from '@/components/select-inputs/input-select-bank-account/input-select-bank-account'
import { InputSelectCategory } from '@/components/select-inputs/input-select-category/input-select-category'
import { FormControl } from '@/components/ui/form-control/form-control'
import { FormLabel } from '@/components/ui/form-label/form-label'
import { FormMessage } from '@/components/ui/form-message/form-message'
import { GridItem } from '@/components/ui/grid/grid-item'
import { GridRow } from '@/components/ui/grid/grid-row'
import { Input } from '@/components/ui/input/input'
import { InputDate } from '@/components/ui/input-date/input-date'
import { InputNumber } from '@/components/ui/input-number/input-number'
import { Documents } from '@/pages/transactions/components/form/documents'
import { formLabels } from '@/pages/transactions/components/form/form-config/form-labels'

import { FormValues } from './form-config/form-values'

export const FormFields: React.FC = () => {
  const methods = useFormContext<FormValues>()

  const {
    formState: { errors },
  } = methods

  return (
    <>
      <div>
        <GridRow>
          <GridItem>
            <FormControl>
              <FormLabel required>{formLabels.date}</FormLabel>
              <Controller
                control={methods.control}
                name="date"
                render={({ field }) => (
                  <InputDate
                    {...field}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value)
                    }}
                  />
                )}
              />
              <FormMessage>{errors?.date?.message}</FormMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel required>{formLabels.description}</FormLabel>
              <Controller
                control={methods.control}
                name="description"
                render={({ field }) => (
                  <Input {...field} placeholder="Digite a descrição" />
                )}
              />
              <FormMessage>{errors?.description?.message}</FormMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel required>{formLabels.amount}</FormLabel>
              <Controller
                control={methods.control}
                name="amount"
                render={({ field }) => (
                  <InputNumber
                    value={field.value}
                    onValueChange={(values) =>
                      field.onChange(values.floatValue)
                    }
                    placeholder="Digite a descrição"
                  />
                )}
              />
              <FormMessage>{errors?.amount?.message}</FormMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel required>{formLabels.categoryId}</FormLabel>
              <Controller
                control={methods.control}
                name="categoryId"
                render={({ field }) => (
                  <InputSelectCategory
                    value={field.value || null}
                    onChange={(_, newValue) => {
                      field.onChange(newValue)
                    }}
                  />
                )}
              />
              <FormMessage>{errors?.categoryId?.message}</FormMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel required>{formLabels.sourceBankAccountId}</FormLabel>
              <Controller
                control={methods.control}
                name="sourceBankAccountId"
                render={({ field }) => (
                  <InputSelectBankAccount
                    value={field.value}
                    onChange={(_, newValue) => {
                      field.onChange(newValue)
                    }}
                  />
                )}
              />
              <FormMessage>{errors?.sourceBankAccountId?.message}</FormMessage>
            </FormControl>
          </GridItem>
        </GridRow>

        <GridRow>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
            <FormLabel>{formLabels.documentIds}</FormLabel>
            <Documents />
            <FormMessage>{errors?.documentIds?.message}</FormMessage>
          </GridItem>
        </GridRow>
      </div>
    </>
  )
}
