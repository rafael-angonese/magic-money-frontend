import React from 'react'

import { Controller, useFormContext } from 'react-hook-form'

import { InputSelectDocumentType } from '@/components/select-inputs/input-select-document-type/input-select-document-type'
import Dropzone from '@/components/ui/dropzone/dropzone'
import DropzoneFilePreview from '@/components/ui/dropzone-file-preview/dropzone-file-preview'
import { FormControl } from '@/components/ui/form-control/form-control'
import { FormLabel } from '@/components/ui/form-label/form-label'
import { FormMessage } from '@/components/ui/form-message/form-message'
import { GridItem } from '@/components/ui/grid/grid-item'
import { GridRow } from '@/components/ui/grid/grid-row'
import { InputDate } from '@/components/ui/input-date/input-date'
import isPresent from '@/utils/is-present'

import { formLabels } from './form-config/form-labels'
import { FormValues } from './form-config/form-values'

export const FormFields: React.FC = () => {
  const methods = useFormContext<FormValues>()

  const {
    watch,
    setValue,
    formState: { errors },
  } = methods

  const file = watch('file')

  const date = watch('date')

  console.log(date)

  return (
    <>
      <GridRow>
        <GridItem xs={12} sm={12} md={6} lg={3} xl={3}>
          <FormControl>
            <FormLabel required>{formLabels.date}</FormLabel>
            <Controller
              control={methods.control}
              name="date"
              render={({ field }) => (
                <InputDate
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value)
                  }}
                />
              )}
            />
            <FormMessage>{errors?.date?.message}</FormMessage>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={12} md={6} lg={3} xl={3}>
          <Controller
            control={methods.control}
            name="documentType"
            render={({ field }) => (
              <FormControl>
                <FormLabel required>{formLabels.documentType}</FormLabel>
                <InputSelectDocumentType
                  value={field.value || null}
                  onChange={(_, value) => field.onChange(value)}
                />
                <FormMessage>{errors?.documentType?.message}</FormMessage>
              </FormControl>
            )}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
          <Controller
            control={methods.control}
            name="file"
            render={({ field }) => (
              <FormControl>
                <FormLabel required>{formLabels.file}</FormLabel>
                <Dropzone
                  accept={{
                    'application/pdf': [],
                    'image/*': ['.png', '.jpeg', '.jpg'],
                  }}
                  onUpload={(files) => {
                    if (files.length >= 1) {
                      field.onChange(files[0])
                    } else {
                      field.onChange(null)
                    }
                  }}
                />
                <FormMessage>{errors?.file?.message}</FormMessage>
              </FormControl>
            )}
          />

          <div>
            <ul>
              {file && isPresent(file) && (
                <>
                  <span>Arquivo:</span>
                  <DropzoneFilePreview
                    onRemoveClick={() => {
                      setValue('file', null)
                    }}
                  >
                    {file.name}
                  </DropzoneFilePreview>
                </>
              )}
            </ul>
          </div>
        </GridItem>
      </GridRow>
    </>
  )
}
