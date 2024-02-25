import React from 'react'

import { Loader2 } from 'lucide-react'
import { cnBase } from 'tailwind-variants'

export interface LoaderProps {
  isLoading?: boolean
  className?: string
}

export const Loader: React.FC<LoaderProps> = ({ isLoading, className }) => {
  return (
    <>
      {isLoading && (
        <Loader2 className={cnBase('mr-1 h-4 w-4 animate-spin', className)} />
      )}
    </>
  )
}
