import { forwardRef } from 'react'

import { AvatarImage as RadixAvatarImage } from '@radix-ui/react-avatar'
import { tv } from 'tailwind-variants'

export const imageVariants = tv({
  base: 'aspect-square h-full w-full',
})

export const AvatarImage = forwardRef<
  React.ElementRef<typeof RadixAvatarImage>,
  React.ComponentPropsWithoutRef<typeof RadixAvatarImage>
>(({ className, ...props }, ref) => (
  <RadixAvatarImage
    ref={ref}
    className={imageVariants({
      className,
    })}
    {...props}
  />
))

AvatarImage.displayName = RadixAvatarImage.displayName
