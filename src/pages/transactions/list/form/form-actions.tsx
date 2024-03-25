import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button/button'
import { Dialog } from '@/components/ui/dialog/dialog'
import { Form } from '@/components/ui/form/form'
import { Grid } from '@/components/ui/grid/grid'
import { Input } from '@/components/ui/input/input'
import { LinearProgress } from '@/components/ui/linear-progress/linear-progress'
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

  const { handleSubmit } = methods

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

      <Dialog.Root modal open={isShowForm} onOpenChange={onCloseClick}>
        <Dialog.Overlay />
        <Dialog.Content>
          <Form.Provider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Header>
                <Dialog.Title>
                  Novo{' '}
                  {type && type === TransactionType.DEBIT
                    ? 'pagamento'
                    : 'recebimento'}
                </Dialog.Title>
                <Dialog.Description>
                  Make changes to your profile here. Click save when youre done.
                </Dialog.Description>
              </Dialog.Header>
              <div>
                <LinearProgress isLoading={isPending} />
                <Grid.Row>
                  <Grid.Item>
                    <Form.Field
                      control={methods.control}
                      name="date"
                      render={({ field }) => (
                        <Form.Item>
                          <Form.Label required>{formLabels.date}</Form.Label>
                          <Form.Control>
                            <Input
                              {...field}
                              type="date"
                              placeholder="Digite a descrição"
                            />
                          </Form.Control>
                          <Form.Message />
                        </Form.Item>
                      )}
                    />
                  </Grid.Item>

                  <Grid.Item>
                    <Form.Field
                      control={methods.control}
                      name="description"
                      render={({ field }) => (
                        <Form.Item>
                          <Form.Label required>
                            {formLabels.description}
                          </Form.Label>
                          <Form.Control>
                            <Input
                              {...field}
                              placeholder="Digite a descrição"
                            />
                          </Form.Control>
                          <Form.Message />
                        </Form.Item>
                      )}
                    />
                  </Grid.Item>
                </Grid.Row>
              </div>
              <Dialog.Footer>
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
              </Dialog.Footer>
            </form>
          </Form.Provider>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
