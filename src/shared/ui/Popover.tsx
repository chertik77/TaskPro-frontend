import type { ComponentProps } from 'react'

import { Popover as PopoverPrimitive } from '@base-ui/react/popover'

import { cn } from '../lib'
import { Icon } from './Icon'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = ({
  className,
  align = 'center',
  alignOffset = 0,
  side = 'bottom',
  collisionPadding,
  sideOffset = 5,
  ...props
}: PopoverPrimitive.Popup.Props & PopoverPrimitive.Positioner.Props) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Positioner
      align={align}
      alignOffset={alignOffset}
      collisionPadding={collisionPadding}
      side={side}
      sideOffset={sideOffset}
      className='isolate z-1000'>
      <PopoverPrimitive.Popup
        className={cn(
          'fade-zoom shadow-base z-1000 rounded-lg outline-none',
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Positioner>
  </PopoverPrimitive.Portal>
)

const PopoverClose = ({
  className,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Close>) => (
  <PopoverPrimitive.Close
    className={cn('focus-visible:styled-outline', className)}
    {...props}>
    <Icon
      name='close'
      className='size-4.5'
    />
  </PopoverPrimitive.Close>
)

export { Popover, PopoverTrigger, PopoverContent, PopoverClose }
