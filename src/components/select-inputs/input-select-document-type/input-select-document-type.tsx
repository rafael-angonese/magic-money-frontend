import { useState } from 'react'

import {
  InputSelect,
  InputSelectProps,
} from '@/components/ui/input-select/input-select'
import {
  DocumentTypeOption,
  documentTypeOptions,
} from '@/constants/document-type'

export interface InputSelectDocumentTypeProps<
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
> extends Omit<
    InputSelectProps<DocumentTypeOption, Multiple, DisableClearable, false>,
    'options'
  > {}

export const InputSelectDocumentType = <
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
>({
  ...props
}: InputSelectDocumentTypeProps<Multiple, DisableClearable>) => {
  const [inputValue, setInputValue] = useState('')

  return (
    <InputSelect
      options={documentTypeOptions}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={(option) => option.name}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue)
      }}
      {...props}
    />
  )
}

InputSelectDocumentType.displayName = 'InputSelectDocumentType'
