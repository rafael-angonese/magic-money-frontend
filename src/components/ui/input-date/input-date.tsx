import { forwardRef, useEffect, useState } from 'react'

import { cnBase } from 'tailwind-variants'

import { Input, InputProps } from '@/components/ui/input/input'
import formatDate from '@/utils/format-date'
import maskDate from '@/utils/masks/mask-date'

const DDMMYYYY =
  /^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](18|19|20)\d\d$/i

interface InputDateProps extends Omit<InputProps, 'value' | 'onChange'> {
  value?: Date | string | null
  onChange: (date: Date | null) => void
}

export const InputDate = forwardRef<HTMLDivElement, InputDateProps>(
  (
    { className, placeholder = 'dd/mm/yyyy', value, onChange, ...props },
    ref,
  ) => {
    const [dateString, setDateString] = useState<string>(
      value
        ? formatDate(value, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
        : '',
    )

    useEffect(() => {
      setDateString(
        value
          ? formatDate(value, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
          : '',
      )
    }, [value])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target

      const maskedValue = maskDate(value)
      setDateString(maskedValue)

      const parts = maskedValue.split('/')
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10)
        const month = parseInt(parts[1], 10) - 1
        const year = parseInt(parts[2], 10)

        if (
          !isNaN(day) &&
          !isNaN(month) &&
          !isNaN(year) &&
          DDMMYYYY.test(value)
        ) {
          onChange(new Date(year, month, day))
          return
        }
      }

      onChange(null)
    }

    return (
      <>
        <Input
          className={cnBase(className)}
          placeholder={placeholder}
          ref={ref}
          value={dateString}
          onChange={handleChange}
          {...props}
        />
      </>
    )
  },
)

InputDate.displayName = 'InputDate'
