import { Link } from '@/components/link/link'
import { Button } from '@/components/ui/button/button'
import { Grid } from '@/components/ui/grid/grid'
import { Heading } from '@/components/ui/heading/heading'
import { InputGroup } from '@/components/ui/input-group/input-group'
import { InputRightElement } from '@/components/ui/input-right-element/input-right-element'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { LinearProgress } from '@/components/ui/linear-progress/linear-progress'
import { Pagination } from '@/components/ui/pagination/pagination'
import { Table } from '@/components/ui/table/table'
import { categoryTypeTranslations } from '@/constants/category-type'
import { DEFAULT_META } from '@/constants/default-meta'
import { queryKeys } from '@/constants/react-query-keys'
import useDebounce from '@/hooks/use-debounce'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'
import { getCategories } from '@/repositories/categories/get-categories'
import isBlank from '@/utils/is-blank'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const ListCategoriesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    qs: searchParams.get('qs') || '',
  })
  const debouncedFilters = useDebounce(filters)

  const page = Number(searchParams.get('page')) || 1

  const { data, isPending } = useQuery({
    queryKey: [queryKeys.categories, { page, ...debouncedFilters }],
    queryFn: () => getCategories({ page, ...debouncedFilters }),
  })

  const categories = data?.data?.data ?? []
  const meta = data?.data?.meta ?? DEFAULT_META

  return (
    <>
      <PageContentLayout>
        <div className="flex justify-between mb-4">
          <Heading as="h1">Categorias</Heading>

          <Button color="success" asChild>
            <Link to="/bank-accounts/new">Nova Conta</Link>
          </Button>
        </div>

        <Grid.Row className="mb-4">
          <Grid.Item>
            <Label>Pesquisar</Label>
            <InputGroup>
              <Input
                value={filters.qs}
                onChange={(event) => {
                  setFilters({
                    qs: event.target.value,
                  })
                  setSearchParams((state) => {
                    state.set('qs', event.target.value)
                    state.set('page', '1')

                    return state
                  })
                }}
                placeholder="Digite o nome da categoria"
              />
              <InputRightElement>
                <Search />
              </InputRightElement>
            </InputGroup>
          </Grid.Item>
        </Grid.Row>

        {isPending && <LinearProgress indeterminate size="xs" />}
        <div className="rounded-md border">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Nome</Table.Head>
                <Table.Head>Tipo</Table.Head>
                <Table.Head>Ações</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Empty isEmpty={isBlank(categories)} />
              {categories.map((category) => (
                <Table.Row key={category.id}>
                  <Table.Cell className="font-medium">
                    {category.name}
                  </Table.Cell>
                  <Table.Cell>
                    {categoryTypeTranslations[category.type]}
                  </Table.Cell>
                  <Table.Cell className="flex gap-4" />
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
        {isPending && <LinearProgress indeterminate size="xs" />}

        <div className="flex justify-end my-6">
          <Pagination
            page={page}
            totalPages={meta.lastPage}
            onPageChange={(value) => {
              setSearchParams((state) => {
                state.set('page', String(value))

                return state
              })
            }}
          />
        </div>
      </PageContentLayout>
    </>
  )
}