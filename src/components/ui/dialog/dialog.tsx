import { DialogClose } from './dialog-close'
import { DialogContent } from './dialog-content'
import { DialogDescription } from './dialog-description'
import { DialogFooter } from './dialog-footer'
import { DialogHeader } from './dialog-header'
import { DialogOverlay } from './dialog-overlay'
import { DialogPortal } from './dialog-portal'
import { DialogRoot } from './dialog-root'
import { DialogTitle } from './dialog-title'
import { DialogTrigger } from './dialog-trigger'

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Header: DialogHeader,
  Close: DialogClose,
}
