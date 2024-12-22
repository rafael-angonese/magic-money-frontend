import React from 'react'

import { FormProvider } from 'react-hook-form'

import { Heading } from '@/components/ui/heading/heading'
import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'
import { useDocumentForm } from '@/pages/documents/components/form/use-document-form'

import { Form } from './form'

export const NewDocumentPage: React.FC = () => {
  const methods = useDocumentForm()

  return (
    <>
      <PageContentLayout>
        <div className="flex justify-between mb-12">
          <Heading as="h1">Novo Documento</Heading>
        </div>

        <FormProvider {...methods}>
          <Form />
        </FormProvider>
      </PageContentLayout>
    </>
  )
}
