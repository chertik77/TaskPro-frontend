import type { ComponentProps } from 'react'

import * as PopoverPrimitive from '@radix-ui/react-popover'

import { cn } from '../lib'
import { Icon } from './Icon'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = ({
  className,
  align = 'center',
  sideOffset = 5,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content>) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'fade-zoom shadow-main z-[1000] rounded-lg outline-none',
        className
      )}
      {...props}
    />
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
      className='size-4.5 stroke-black dark:stroke-white'
    />
  </PopoverPrimitive.Close>
)

export { Popover, PopoverTrigger, PopoverContent, PopoverClose }
