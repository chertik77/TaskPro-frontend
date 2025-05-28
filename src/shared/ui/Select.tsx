import type { ComponentProps } from 'react'

import * as SelectPrimitive from '@radix-ui/react-select'

import { cn } from '../lib/cn'

const Select = SelectPrimitive.Root

const SelectValue = SelectPrimitive.Value

const SelectViewport = SelectPrimitive.Viewport

const SelectItemText = SelectPrimitive.ItemText

const SelectIcon = SelectPrimitive.Icon

const SelectTrigger = ({
  className,
  ref,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger>) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn('focus-visible:styled-outline', className)}
    {...props}>
    {children}
  </SelectPrimitive.Trigger>
)

const SelectContent = ({
  className,
  children,
  ref,
  sideOffset = 5,
  position = 'popper',
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        `fade-zoom border-brand bg-white-soft shadow-main violet:border-white-gray
        dark:bg-black-deep dark:border-brand/50 rounded-lg border p-4.5`,
        className
      )}
      sideOffset={sideOffset}
      position={position}
      {...props}>
      {children}
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
)

const SelectItem = ({
  className,
  ref,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      `hocus:text-brand violet:hocus:text-brand-violet data-[state=checked]:text-brand
      violet:data-[state=checked]:text-brand-violet cursor-pointer text-base
      outline-none dark:text-white/30`,
      className
    )}
    {...props}>
    {children}
  </SelectPrimitive.Item>
)

export {
  Select,
  SelectIcon,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemText
}
