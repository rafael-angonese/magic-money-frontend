import React, { useState } from 'react'

import { Controller, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button/button'
import { DialogContent } from '@/components/ui/dialog-content/dialog-content'
import { DialogTitle } from '@/components/ui/dialog-title/dialog-title'
import { FormControl } from '@/components/ui/form-control/form-control'
import { FormLabel } from '@/components/ui/form-label/form-label'
import { FormMessage } from '@/components/ui/form-message/form-message'
import { GridItem } from '@/components/ui/grid/grid-item'
import { GridRow } from '@/components/ui/grid/grid-row'
import { Input } from '@/components/ui/input/input'
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

  const navigate = useNavigate()
  const methods = useTransactionForm()
  const { mutateAsync, isPending } = useCreateTransaction()

  const {
    handleSubmit,
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
      navigate('/products')
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

                          <Input
                            {...field}
                            type="date"
                            placeholder="Digite a descrição"
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
                </GridRow>
              </div>
              <div className="flex justify-end gap-2">
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
