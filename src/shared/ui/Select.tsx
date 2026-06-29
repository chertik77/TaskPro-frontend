import type { ComponentProps } from 'react'

import { Select as SelectPrimitive } from '@base-ui/react/select'

import { cn } from '../lib'

const Select = SelectPrimitive.Root

const SelectValue = SelectPrimitive.Value

const SelectItemText = SelectPrimitive.ItemText

const SelectIcon = SelectPrimitive.Icon

const SelectTrigger = ({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger>) => (
  <SelectPrimitive.Trigger
    className={cn('focus-visible:styled-outline', className)}
    {...props}>
    {children}
  </SelectPrimitive.Trigger>
)

const SelectContent = ({
  className,
  children,
  side = 'bottom',
  align = 'center',
  sideOffset = 5,
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
  >) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Positioner
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      alignItemWithTrigger={alignItemWithTrigger}
      className='isolate z-1000'>
      <SelectPrimitive.Popup
        className={cn(
          `fade-zoom border-brand bg-white-soft shadow-base dark:bg-black-deep
          dark:border-brand/50 rounded-lg border p-4.5`,
          className
        )}
        {...props}>
        {children}
      </SelectPrimitive.Popup>
    </SelectPrimitive.Positioner>
  </SelectPrimitive.Portal>
)

const SelectItem = ({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) => (
  <SelectPrimitive.Item
    className={cn(
      `data-selected:text-brand hocus:text-brand cursor-pointer text-base
      outline-none data-disabled:pointer-events-none dark:text-white/30`,
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
  SelectItem,
  SelectItemText
}
