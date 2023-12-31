import { DialogPortalProps, Portal } from '@radix-ui/react-dialog'

export const DialogPortal = ({ ...props }: DialogPortalProps) => (
  <Portal {...props} />
)
DialogPortal.displayName = Portal.displayName
