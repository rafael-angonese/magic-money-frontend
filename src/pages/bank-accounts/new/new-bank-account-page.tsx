import { Button } from '@/components/ui/button/button'
import { Form } from '@/components/ui/form/form'
import { Grid } from '@/components/ui/grid/grid'
import { Heading } from '@/components/ui/heading/heading'
import { InputNumber } from '@/components/ui/input-number/input-number'
import { Input } from '@/components/ui/input/input'
import { Loader } from '@/components/ui/loader/loader'
import React from 'react'
import { useNewBankAccount } from './use-new-bank-account'

export const NewBankAccountPage: React.FC = () => {
  const { isLoading, methods, onSubmit } = useNewBankAccount()

  const { handleSubmit } = methods

  return (
    <>
      <div>
        <div className="flex justify-between mb-12">
          <Heading as="h1">Nova Conta Bancaria</Heading>
        </div>

        <Form.Provider {...methods}>
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
                        <Input
                          {...field}
                          placeholder="digite o nome da conta"
                        />
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
              <Button type="submit" color="primary" disabled={isLoading}>
                <Loader isLoading={isLoading} />
                Salvar
              </Button>
            </div>
          </form>
        </Form.Provider>
      </div>
    </>
  )
}
