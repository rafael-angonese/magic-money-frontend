import React from 'react'

import { Checkbox } from '@mui/joy'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { FormLabel } from '@/components/ui/form-label/form-label'
import { GridItem } from '@/components/ui/grid/grid-item'
import { GridRow } from '@/components/ui/grid/grid-row'
import { InputDate } from '@/components/ui/input-date/input-date'
import { Table } from '@/components/ui/table/table'
import { TableBody } from '@/components/ui/table/table-body'
import { TableCell } from '@/components/ui/table/table-cell'
import { TableEmpty } from '@/components/ui/table/table-empty'
import { TableHead } from '@/components/ui/table/table-head'
import { TableHeader } from '@/components/ui/table/table-header'
import { TableRow } from '@/components/ui/table/table-row'
import { documentTypeTranslations } from '@/constants/document-type'
import { useDocumentsFiltersStore } from '@/pages/documents/list/hooks/use-documents-filters-store'
import { useListDocuments } from '@/pages/documents/list/hooks/use-list-documents'
import formatDate from '@/utils/format-date'
import isBlank from '@/utils/is-blank'

import { FormValues } from './form-config/form-values'

export const Documents: React.FC = () => {
  const { data } = useListDocuments()
  const {
    initialDateAt,
    finalDateAt,
    setFinalDateAt,
    setInitialDateAt,
    previousMonth,
    nextMonth,
  } = useDocumentsFiltersStore()

  const methods = useFormContext<FormValues>()

  const { setValue, watch } = methods

  const documents = data?.data?.data ?? []

  const selectedDocumentsIds = watch('documentIds') ?? []

  return (
    <>
      <GridRow className="mb-4">
        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
          <>
            <FormLabel>Data</FormLabel>
            <div className="flex gap-2 w-full min-w-[300px]">
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Tipo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableEmpty isEmpty={isBlank(documents)} />
            {documents.map((document) => (
              <TableRow key={document.id}>
                <TableCell>
                  <div className="flex gap-2 items-center text-center">
                    <Checkbox
                      checked={selectedDocumentsIds.includes(document.id)}
                      onChange={(event) => {
                        const checked = event.target.checked
                        if (checked) {
                          setValue('documentIds', [
                            ...selectedDocumentsIds,
                            document.id,
                          ])
                        } else {
                          setValue(
                            'documentIds',
                            selectedDocumentsIds.filter(
                              (id) => id !== document.id,
                            ),
                          )
                        }
                      }}
                    />
                    {document.id}
                  </div>
                </TableCell>
                <TableCell>{formatDate(document.date)}</TableCell>
                <TableCell>
                  {documentTypeTranslations[document.documentType]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
