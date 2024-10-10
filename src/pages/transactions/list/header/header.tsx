import React from 'react'

import { Heading } from '@/components/ui/heading/heading'

import { FormActions } from './form-actions'

export const Header: React.FC = () => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <Heading as="h1">Transações</Heading>

        <FormActions />
      </div>
    </>
  )
}
