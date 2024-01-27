import React from 'react'
import {
  Link as RouterDomLink,
  LinkProps as RouterDomLinkProps,
} from 'react-router-dom'

export interface LinkProps extends RouterDomLinkProps {}

export const Link: React.FC<LinkProps> = (props) => {
  return (
    <>
      <RouterDomLink {...props} />
    </>
  )
}
