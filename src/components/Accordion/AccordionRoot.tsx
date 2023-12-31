import { Root } from '@radix-ui/react-accordion'

export const AccordionRoot: React.FC<
  React.ComponentPropsWithoutRef<typeof Root>
> = ({ ...props }) => {
  return <Root {...props} />
}

AccordionRoot.displayName = Root.displayName
