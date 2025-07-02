import type { ComponentProps } from 'react'

import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '../lib'

const Avatar = ({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Root>) => (
  <AvatarPrimitive.Root
    className={cn('flex size-8 shrink-0 overflow-hidden rounded-lg', className)}
    {...props}
  />
)

const AvatarImage = ({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Image>) => (
  <AvatarPrimitive.Image
    className={cn('aspect-square size-full rounded-[inherit]', className)}
    referrerPolicy='no-referrer'
    {...props}
  />
)

const AvatarFallback = ({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Fallback>) => (
  <AvatarPrimitive.Fallback
    className={cn(
      `bg-white-muted violet:bg-white-gray dark:bg-black-soft flex size-full
      items-center justify-center rounded-[inherit]`,
      className
    )}
    {...props}
  />
)

export { Avatar, AvatarImage, AvatarFallback }
