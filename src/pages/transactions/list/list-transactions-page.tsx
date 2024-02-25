import React from 'react'

import { Button } from '@/components/ui/button/button'
import { Heading } from '@/components/ui/heading/heading'
import { Table } from '@/components/ui/table/table'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
]

const ListTransactionsPage: React.FC = () => {
  return (
    <PageContentLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <Heading as="h1">Transações</Heading>

          <div className=" flex gap-2">
            <Button color="success">Criar recebimento</Button>
            <Button color="error">Criar pagamento</Button>
          </div>
        </div>
        <div className="mt-4 rounded-md border">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Data</Table.Head>
                <Table.Head>Categoria</Table.Head>
                <Table.Head>Descrição</Table.Head>
                <Table.Head>Valor</Table.Head>
                <Table.Head>Conta</Table.Head>
                <Table.Head>Ações</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {invoices.map((invoice) => (
                <Table.Row key={invoice.invoice}>
                  <Table.Cell className="font-medium">
                    {invoice.invoice}
                  </Table.Cell>
                  <Table.Cell>{invoice.paymentStatus}</Table.Cell>
                  <Table.Cell>{invoice.paymentMethod}</Table.Cell>
                  <Table.Cell>{invoice.totalAmount}</Table.Cell>
                  <Table.Cell>{invoice.totalAmount}</Table.Cell>
                  <Table.Cell>{invoice.totalAmount}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      </div>
    </PageContentLayout>
  )
}

export default ListTransactionsPage
