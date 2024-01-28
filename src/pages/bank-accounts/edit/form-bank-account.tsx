import { Button } from '@/components/ui/button/button'
import { Form } from '@/components/ui/form/form'
import { Grid } from '@/components/ui/grid/grid'
import { InputNumber } from '@/components/ui/input-number/input-number'
import { Input } from '@/components/ui/input/input'
import { Loader } from '@/components/ui/loader/loader'
import {
  UpdateBankAccountRequest,
  updateBankAccount,
} from '@/repositories/bank-accounts/update-bank-account'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { FormValues } from './form-config/form-values'

export const FormBankAccount: React.FC = () => {
  const methods = useFormContext<FormValues>()
  const navigate = useNavigate()
  const { id } = useParams()

  const { handleSubmit } = methods

  const { mutateAsync: updateBankAccountFn, isPending } = useMutation({
    mutationKey: ['update-bank-account'],
    mutationFn: (values: UpdateBankAccountRequest) => {
      return updateBankAccount(id!, values)
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      await updateBankAccountFn({
        name: values.name,
        balance: values.balance,
      })

      navigate('/bank-accounts')
    } catch (error) {}
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid.Row>
          <Grid.Item xs={12} sm={12} md={6} lg={3} xl={3}>
            <Form.Field
              control={methods.control}
              name="name"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label required>Nome da conta</Form.Label>
                  <Form.Control>
                    <Input {...field} placeholder="digite o nome da conta" />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
          </Grid.Item>
          <Grid.Item xs={12} sm={12} md={6} lg={3} xl={3}>
            <Form.Field
              control={methods.control}
              name="balance"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label required>Saldo</Form.Label>
                  <Form.Control>
                    <InputNumber
                      value={field.value}
                      onValueChange={(values) =>
                        field.onChange(values.floatValue)
                      }
                      placeholder="Digite o saldo"
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
          </Grid.Item>
        </Grid.Row>
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
