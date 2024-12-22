import React from 'react'

import { Checkbox } from '@mui/joy'
import { useFormContext } from 'react-hook-form'

import { Table } from '@/components/ui/table/table'
import { TableBody } from '@/components/ui/table/table-body'
import { TableCell } from '@/components/ui/table/table-cell'
import { TableEmpty } from '@/components/ui/table/table-empty'
import { TableHead } from '@/components/ui/table/table-head'
import { TableHeader } from '@/components/ui/table/table-header'
import { TableRow } from '@/components/ui/table/table-row'
import { documentTypeTranslations } from '@/constants/document-type'
import { useListDocuments } from '@/pages/documents/list/hooks/use-list-documents'
import formatDate from '@/utils/format-date'
import isBlank from '@/utils/is-blank'

import { FormValues } from './form-config/form-values'

export const Documents: React.FC = () => {
  const { data } = useListDocuments()

  const methods = useFormContext<FormValues>()

  const { setValue, watch } = methods

  const documents = data?.data?.data ?? []

  const selectedDocumentsIds = watch('documentIds') ?? []

  return (
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
  )
}
