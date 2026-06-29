import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar'

import { cn } from '../lib'

const Avatar = ({ className, ...props }: AvatarPrimitive.Root.Props) => (
  <AvatarPrimitive.Root
    className={cn('flex size-8 shrink-0 overflow-hidden rounded-lg', className)}
    {...props}
  />
)

const AvatarImage = ({ className, ...props }: AvatarPrimitive.Image.Props) => (
  <AvatarPrimitive.Image
    className={cn('aspect-square size-full rounded-[inherit]', className)}
    referrerPolicy='no-referrer'
    {...props}
  />
)

const AvatarFallback = ({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) => (
  <AvatarPrimitive.Fallback
    className={cn(
      `bg-white-muted dark:bg-black-soft flex size-full items-center
      justify-center rounded-[inherit]`,
      className
    )}
    {...props}
  />
)

export { Avatar, AvatarImage, AvatarFallback }
