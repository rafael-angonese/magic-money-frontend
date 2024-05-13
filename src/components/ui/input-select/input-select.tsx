import { Autocomplete, AutocompleteProps, CircularProgress } from '@mui/joy'

export interface InputSelectProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined = undefined,
> extends Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    'renderInput'
  > {}

export const InputSelect = <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
>({
  multiple,
  placeholder = 'Selecione...',
  noOptionsText = 'Nenhum registro encontrado',
  loadingText = 'Carregando...',
  loading,
  ...props
}: InputSelectProps<T, Multiple, DisableClearable, FreeSolo>) => {
  return (
    <Autocomplete
      multiple={multiple}
      disableCloseOnSelect={multiple}
      placeholder={placeholder}
      noOptionsText={noOptionsText}
      loadingText={loadingText}
      endDecorator={
        loading ? (
          <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
        ) : null
      }
      {...props}
    />
  )
}

InputSelect.displayName = 'InputSelect'
