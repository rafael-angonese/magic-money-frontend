import { Link } from '@/components/link/link'
import { Button } from '@/components/ui/button/button'
import { Heading } from '@/components/ui/heading/heading'
import { LinearProgress } from '@/components/ui/linear-progress/linear-progress'
import { Table } from '@/components/ui/table/table'
import { categoryTypeTranslations } from '@/constants/category-type'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'
import { getCategories } from '@/repositories/categories/get-bank-categories'
import isBlank from '@/utils/is-blank'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export const ListCategoriesPage: React.FC = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories({}),
  })

  if (isLoading) {
    return <LinearProgress indeterminate size="xs" />
  }

  return (
    <>
      <PageContentLayout>
        <div className="flex justify-between mb-12">
          <Heading as="h1">Categorias</Heading>

          <Button color="success" asChild>
            <Link to="/bank-accounts/new">Nova Conta</Link>
          </Button>
        </div>

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
              <Table.Empty isEmpty={isBlank(data?.data?.data)} />
              {data?.data?.data.map((category) => (
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

        {isFetching && <LinearProgress indeterminate size="xs" />}
      </PageContentLayout>
    </>
  )
}
