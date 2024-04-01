import React from 'react'

import { Search } from 'lucide-react'

import { Link } from '@/components/link/link'
import { Button } from '@/components/ui/button/button'
import { FormLabel } from '@/components/ui/form-label/form-label'
import { GridItem } from '@/components/ui/grid/grid-item'
import { GridRow } from '@/components/ui/grid/grid-row'
import { Heading } from '@/components/ui/heading/heading'
import { Input } from '@/components/ui/input/input'
import { LinearProgress } from '@/components/ui/linear-progress/linear-progress'
import { Pagination } from '@/components/ui/pagination/pagination'
import { Table } from '@/components/ui/table/table'
import { categoryTypeTranslations } from '@/constants/category-type'
import { DEFAULT_META } from '@/constants/default-meta'
import { useDebounceCallback } from '@/hooks/use-debounce-callback'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'
import { useListCategories } from '@/pages/categories/list/use-list-categories'
import { useCategoryFilters } from '@/store/categories/use-category-filters'
import isBlank from '@/utils/is-blank'

export const ListCategoriesPage: React.FC = () => {
  const { qs, page, setPage, setQs } = useCategoryFilters()
  const { data, isPending } = useListCategories()

  const categories = data?.data?.data ?? []
  const meta = data?.data?.meta ?? DEFAULT_META

  const refresh = useDebounceCallback(() => {
    setPage(1)
  })

  return (
    <>
      <PageContentLayout>
        <div className="flex justify-between mb-4">
          <Heading as="h1">Categorias</Heading>

          <Button color="success" asChild>
            <Link to="/categories/new">Nova Categoria</Link>
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
              placeholder="Digite o nome da categoria"
              endDecorator={<Search />}
            />
          </GridItem>
        </GridRow>

        <LinearProgress isLoading={isPending} />
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
