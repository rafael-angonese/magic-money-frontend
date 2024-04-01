import { forwardRef } from 'react'

import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import { cnBase } from 'tailwind-variants'

interface InputDatePickerPickerProps extends DatePickerProps<Dayjs> {}

export const InputDatePicker = forwardRef<
  HTMLInputElement,
  InputDatePickerPickerProps
>(({ className, ...props }, ref) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <DatePicker className={cnBase(className)} ref={ref} {...props} />
      </LocalizationProvider>
    </>
  )
})

InputDatePicker.displayName = 'InputDatePicker'
