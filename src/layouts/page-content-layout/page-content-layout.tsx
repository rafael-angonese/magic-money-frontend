import React, { ComponentProps } from 'react'
import { cnBase } from 'tailwind-variants'

export interface PageContentLayoutProps extends ComponentProps<'div'> {}

export const PageContentLayout: React.FC<PageContentLayoutProps> = ({
  className,
  ...props
}) => {
  return <div className={cnBase('p-4', className)} {...props} />
}
