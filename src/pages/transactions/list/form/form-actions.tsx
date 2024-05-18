import React, { useState } from 'react'

import { Controller, FormProvider } from 'react-hook-form'

import { InputSelectBankAccount } from '@/components/select-inputs/input-select-bank-account/input-select-bank-account'
import { InputSelectCategory } from '@/components/select-inputs/input-select-category/input-select-category'
import { Button } from '@/components/ui/button/button'
import { DialogContent } from '@/components/ui/dialog-content/dialog-content'
import { DialogTitle } from '@/components/ui/dialog-title/dialog-title'
import { FormControl } from '@/components/ui/form-control/form-control'
import { FormLabel } from '@/components/ui/form-label/form-label'
import { FormMessage } from '@/components/ui/form-message/form-message'
import { GridItem } from '@/components/ui/grid/grid-item'
import { GridRow } from '@/components/ui/grid/grid-row'
import { Input } from '@/components/ui/input/input'
import { InputDate } from '@/components/ui/input-date/input-date'
import { InputNumber } from '@/components/ui/input-number/input-number'
import { LinearProgress } from '@/components/ui/linear-progress/linear-progress'
import { Modal } from '@/components/ui/modal/modal'
import { ModalClose } from '@/components/ui/modal-close/modal-close'
import { ModalDialog } from '@/components/ui/modal-dialog/modal-dialog'
import { formLabels } from '@/pages/transactions/list/form/form-config/form-labels'
import { useCreateTransaction } from '@/pages/transactions/list/form/use-create-transaction'
import { useTransactionForm } from '@/pages/transactions/list/form/use-transaction-form'
import { TransactionType } from '@/types/transaction'

import { FormValues } from './form-config/form-values'

export const FormActions: React.FC = () => {
  const [isShowForm, setIsShowForm] = useState(false)
  const [type, setType] = useState<TransactionType | null>(null)

  const methods = useTransactionForm()
  const { mutateAsync, isPending } = useCreateTransaction()

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods

  const onNewCreditClick = () => {
    setIsShowForm(true)
    setType(TransactionType.CREDIT)
  }

  const onNewDebitClick = () => {
    setIsShowForm(true)
    setType(TransactionType.DEBIT)
  }

  const onCloseClick = () => {
    setIsShowForm(false)
    setType(null)
  }

  const onSubmit = async (data: FormValues) => {
    try {
      await mutateAsync({
        date: data.date,
        description: data.description,
        amount: data.amount,
        type: type!,
        categoryId: data.categoryId.id,
        bankAccountId: data.bankAccountId.id,
      })
      reset()
      setIsShowForm(false)
    } catch (error) {
      // TODO handling http error
    }
  }

  return (
    <>
      <div className=" flex gap-2">
        <Button onClick={onNewCreditClick} color="success">
          Criar recebimento
        </Button>
        <Button onClick={onNewDebitClick} color="error">
          Criar pagamento
        </Button>
      </div>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={isShowForm}
        onClose={onCloseClick}
      >
        <ModalDialog>
          <ModalClose />

          <DialogTitle>
            Novo{' '}
            {type && type === TransactionType.DEBIT
              ? 'pagamento'
              : 'recebimento'}
          </DialogTitle>
          <DialogContent>Essa ação não pode ser desfeita.</DialogContent>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <LinearProgress isLoading={isPending} />
                <GridRow>
                  <GridItem>
                    <Controller
                      control={methods.control}
                      name="date"
                      render={({ field }) => (
                        <FormControl>
                          <FormLabel required>{formLabels.date}</FormLabel>
                          <InputDate
                            {...field}
                            value={field.value}
                            onChange={(value) => {
                              field.onChange(value)
                            }}
                          />
                          <FormMessage>{errors?.date?.message}</FormMessage>
                        </FormControl>
                      )}
                    />
                  </GridItem>

                  <GridItem>
                    <Controller
                      control={methods.control}
                      name="description"
                      render={({ field }) => (
                        <FormControl>
                          <FormLabel required>
                            {formLabels.description}
                          </FormLabel>

                          <Input {...field} placeholder="Digite a descrição" />

                          <FormMessage>
                            {errors?.description?.message}
                          </FormMessage>
                        </FormControl>
                      )}
                    />
                  </GridItem>

                  <GridItem>
                    <Controller
                      control={methods.control}
                      name="amount"
                      render={({ field }) => (
                        <FormControl>
                          <FormLabel required>{formLabels.amount}</FormLabel>
                          <InputNumber
                            value={field.value}
                            onValueChange={(values) =>
                              field.onChange(values.floatValue)
                            }
                            placeholder="Digite a descrição"
                          />
                          <FormMessage>{errors?.amount?.message}</FormMessage>
                        </FormControl>
                      )}
                    />
                  </GridItem>

                  <GridItem>
                    <Controller
                      control={methods.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormControl>
                          <FormLabel required>
                            {formLabels.categoryId}
                          </FormLabel>
                          <InputSelectCategory
                            value={field.value}
                            onChange={(_, newValue) => {
                              field.onChange(newValue)
                            }}
                          />
                          <FormMessage>
                            {errors?.categoryId?.message}
                          </FormMessage>
                        </FormControl>
                      )}
                    />
                  </GridItem>

                  <GridItem>
                    <Controller
                      control={methods.control}
                      name="bankAccountId"
                      render={({ field }) => (
                        <FormControl>
                          <FormLabel required>
                            {formLabels.bankAccountId}
                          </FormLabel>
                          <InputSelectBankAccount
                            value={field.value}
                            onChange={(_, newValue) => {
                              field.onChange(newValue)
                            }}
                          />
                          <FormMessage>
                            {errors?.bankAccountId?.message}
                          </FormMessage>
                        </FormControl>
                      )}
                    />
                  </GridItem>
                </GridRow>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  variant="outlined"
                  disabled={isPending}
                  onClick={onCloseClick}
                >
                  Cancelar
                </Button>
                <Button disabled={isPending} type="submit">
                  Salvar
                </Button>
              </div>
            </form>
          </FormProvider>
        </ModalDialog>
      </Modal>
    </>
  )
}
