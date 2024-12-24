import React from 'react'

import { ArrowLeft, ArrowRight, Search } from 'lucide-react'

import { Button } from '@/components/ui/button/button'
import { FormLabel } from '@/components/ui/form-label/form-label'
import { GridItem } from '@/components/ui/grid/grid-item'
import { GridRow } from '@/components/ui/grid/grid-row'
import { Input } from '@/components/ui/input/input'
import { InputDate } from '@/components/ui/input-date/input-date'
import { useDebounceCallback } from '@/hooks/use-debounce-callback'
import { useDocumentsFiltersStore } from '@/pages/documents/list/hooks/use-documents-filters-store'

export const Filters: React.FC = () => {
  const {
    qs,
    setPage,
    setQs,
    initialDateAt,
    finalDateAt,
    setFinalDateAt,
    setInitialDateAt,
    previousMonth,
    nextMonth,
  } = useDocumentsFiltersStore()

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
            placeholder="Digite o nome do documento"
            endDecorator={<Search />}
          />
        </GridItem>
        <GridItem>
          <>
            <FormLabel>Data</FormLabel>
            <div className="flex gap-2">
              <InputDate
                value={initialDateAt}
                onChange={(value) => {
                  setInitialDateAt(value)
                }}
              />
              <InputDate
                value={finalDateAt}
                onChange={(value) => {
                  setFinalDateAt(value)
                }}
              />
              <Button
                size="sm"
                variant="outlined"
                color="secondary"
                className="p-2"
                onClick={() => previousMonth()}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outlined"
                color="secondary"
                className="p-2"
                onClick={() => nextMonth()}
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </>
        </GridItem>
      </GridRow>
    </>
  )
}
