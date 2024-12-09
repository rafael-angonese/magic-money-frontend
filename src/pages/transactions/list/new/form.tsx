import React from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { queryKeys } from '@/constants/react-query-keys'
import { FormValues } from '@/pages/transactions/components/form/form-config/form-values'
import { FormFields } from '@/pages/transactions/components/form/form-fields'
import { useNewTransactionStore } from '@/pages/transactions/list/new/use-new-transaction-store'
import { createTransaction } from '@/repositories/transactions/create-transaction'
import handlingRequestError from '@/utils/handling-request-error'

export const Form: React.FC = () => {
  const { transactionType, setIsModalOpen, setTransactionType } =
    useNewTransactionStore()
  const methods = useFormContext<FormValues>()

  const queryClient = useQueryClient()

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: FormValues) => {
    try {
      await createTransaction({
        date: data.date,
        description: data.description,
        amount: data.amount,
        type: transactionType!,
        categoryId: data.categoryId.id,
        sourceBankAccountId: data.bankAccountId.id,
        files: data.files,
      })

      queryClient.invalidateQueries({
        queryKey: [queryKeys.transactions],
      })
      onCloseClick()
    } catch (error) {
      handlingRequestError(error)
    }
  }

  const onCloseClick = () => {
    reset()
    setIsModalOpen(false)
    setTransactionType(null)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFields />
        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="outlined"
            disabled={isSubmitting}
            onClick={onCloseClick}
          >
            Cancelar
          </Button>
          <Button disabled={isSubmitting} type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </>
  )
}
