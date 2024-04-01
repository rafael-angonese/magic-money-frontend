import React from 'react'

import { Pencil, Search } from 'lucide-react'

import { Link } from '@/components/link/link'
import { Button } from '@/components/ui/button/button'
import { FormLabel } from '@/components/ui/form-label/form-label'
import { GridItem } from '@/components/ui/grid/grid-item'
import { GridRow } from '@/components/ui/grid/grid-row'
import { Heading } from '@/components/ui/heading/heading'
import { IconButton } from '@/components/ui/icon-button/icon-button'
import { Input } from '@/components/ui/input/input'
import { LinearProgress } from '@/components/ui/linear-progress/linear-progress'
import { Pagination } from '@/components/ui/pagination/pagination'
import { Table } from '@/components/ui/table/table'
import { TableBody } from '@/components/ui/table/table-body'
import { TableCell } from '@/components/ui/table/table-cell'
import { TableEmpty } from '@/components/ui/table/table-empty'
import { TableHead } from '@/components/ui/table/table-head'
import { TableHeader } from '@/components/ui/table/table-header'
import { TableRow } from '@/components/ui/table/table-row'
import { DEFAULT_META } from '@/constants/default-meta'
import { useDebounceCallback } from '@/hooks/use-debounce-callback'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'
import { DeleteBankAccount } from '@/pages/bank-accounts/list/delete-bank-account'
import { useListBankAccounts } from '@/pages/bank-accounts/list/use-list-bank-accounts'
import { useBankAccountFilters } from '@/store/bank-accounts/use-bank-account-filters'
import formatCurrency from '@/utils/format-currency'
import isBlank from '@/utils/is-blank'

export const ListBankAccountsPage: React.FC = () => {
  const { qs, page, setPage, setQs } = useBankAccountFilters()
  const { data, isPending } = useListBankAccounts()

  const bankAccounts = data?.data?.data ?? []
  const meta = data?.data?.meta ?? DEFAULT_META

  const refresh = useDebounceCallback(() => {
    setPage(1)
  })

  return (
    <>
      <PageContentLayout>
        <div className="flex justify-between mb-4">
          <Heading as="h1">Contas Bancarias</Heading>

          <Button color="success" asChild>
            <Link to="/bank-accounts/new">Nova Conta</Link>
          </Button>
        </div>

        <GridRow className="mb-4">
          <GridItem>
            <FormLabel>Pesquisar</FormLabel>
            <Input
              value={qs}
              onChange={(event) => {
                setQs(event.target.value)
                refresh()
              }}
              placeholder="Digite o nome da conta"
              endDecorator={<Search />}
            />
          </GridItem>
        </GridRow>

        <LinearProgress isLoading={isPending} />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Saldo</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableEmpty isEmpty={isBlank(bankAccounts)} />
              {bankAccounts.map((bankAccount) => (
                <TableRow key={bankAccount.id}>
                  <TableCell className="font-medium">
                    {bankAccount.name}
                  </TableCell>
                  <TableCell>{formatCurrency(bankAccount.balance)}</TableCell>
                  <TableCell className="flex gap-4">
                    <IconButton hoverTitle="Editar" asChild>
                      <Link to={`/bank-accounts/edit/${bankAccount.id}`}>
                        <Pencil className="text-warning" size={18} />
                      </Link>
                    </IconButton>
                    <DeleteBankAccount bankAccountId={bankAccount.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <LinearProgress isLoading={isPending} />

        <div className="flex justify-end my-6">
          <Pagination
            page={page}
            totalPages={meta.lastPage}
            onPageChange={(value) => setPage(value)}
          />
        </div>
      </PageContentLayout>
    </>
  )
}
