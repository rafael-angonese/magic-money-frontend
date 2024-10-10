import React from 'react'

import { Search } from 'lucide-react'

import { FormLabel } from '@/components/ui/form-label/form-label'
import { GridItem } from '@/components/ui/grid/grid-item'
import { GridRow } from '@/components/ui/grid/grid-row'
import { Input } from '@/components/ui/input/input'
import { useDebounceCallback } from '@/hooks/use-debounce-callback'
import { useTransactionFiltersStore } from '@/pages/transactions/list/hooks/use-transaction-filters-store'

export const Filters: React.FC = () => {
  const { qs, setPage, setQs } = useTransactionFiltersStore()

  const refresh = useDebounceCallback(() => {
    setPage(1)
  })

  return (
    <>
      <GridRow className="mb-4">
        <GridItem>
          <FormLabel>Pesquisar</FormLabel>
          <Input
            value={qs}
            onChange={(event) => {
              setQs(event.target.value)
              refresh()
            }}
            placeholder="Digite o nome da transação"
            endDecorator={<Search />}
          />
        </GridItem>
      </GridRow>
    </>
  )
}
