import { PiggyBank } from 'lucide-react'
import React from 'react'
import { cnBase } from 'tailwind-variants'

interface LogoProps {
  className?: string
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <>
      <PiggyBank className={cnBase('h-8 w-8', className)} />
    </>
  )
}
