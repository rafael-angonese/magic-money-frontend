import { forwardRef } from 'react'

import { NumericFormat, NumericFormatProps } from 'react-number-format'

import { Input, InputProps } from '@/components/ui/input/input'

type InputNumberProps = Omit<NumericFormatProps, 'size'> & InputProps

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      allowNegative = false,
      decimalScale = 2,
      fixedDecimalScale = true,
      thousandSeparator = '.',
      decimalSeparator = ',',
      ...props
    },
    ref,
  ) => {
    return (
      <NumericFormat
        {...props}
        getInputRef={ref}
        allowNegative={allowNegative}
        decimalScale={decimalScale}
        fixedDecimalScale={fixedDecimalScale}
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        customInput={Input}
      />
    )
  },
)

InputNumber.displayName = 'InputNumber'
