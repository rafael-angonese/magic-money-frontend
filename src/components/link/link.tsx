import { forwardRef } from 'react'
import {
  Link as RouterDomLink,
  LinkProps as RouterDomLinkProps,
} from 'react-router-dom'

export interface LinkProps extends RouterDomLinkProps {}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ ...props }, ref) => {
    return (
      <>
        <RouterDomLink ref={ref} {...props} />
      </>
    )
  },
)

Link.displayName = 'Link'
