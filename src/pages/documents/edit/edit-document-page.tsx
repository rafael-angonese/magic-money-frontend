import React, { useEffect } from 'react'

import { FormProvider } from 'react-hook-form'

import { Heading } from '@/components/ui/heading/heading'
import { LinearProgress } from '@/components/ui/linear-progress/linear-progress'
import { documentTypeOptions } from '@/constants/document-type'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'
import { useDocumentForm } from '@/pages/documents/components/form/use-document-form'
import { useGetDocument } from '@/pages/documents/hooks/use-get-document'

import { Form } from './form'

export const EditDocumentPage: React.FC = () => {
  const methods = useDocumentForm()

  const { isLoading, data } = useGetDocument()

  const { reset } = methods

  const document = data?.data || null

  useEffect(() => {
    if (!document) return

    const documentType = documentTypeOptions.find(
      (option) => option.value === document.documentType,
    )

    reset({
      date: new Date(document.date),
      documentType,
      file: null,
    })
  }, [document, reset])

  if (isLoading) {
    return (
      <div>
        <LinearProgress isLoading />
      </div>
    )
  }

  return (
    <>
      <PageContentLayout>
        <div className="flex justify-between mb-12">
          <Heading as="h1">Editando Documento</Heading>
        </div>

        <FormProvider {...methods}>
          <Form />
        </FormProvider>
      </PageContentLayout>
    </>
  )
}
