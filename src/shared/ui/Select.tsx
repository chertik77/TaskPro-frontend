import type { ComponentProps } from 'react'

import { Select as SelectPrimitive } from '@base-ui/react/select'
import { ChevronDownIcon } from 'lucide-react'

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
    className={cn(
      `focus-visible:border-accent border-accent/50 flex items-center gap-2
      rounded-lg border px-4 py-2.5 outline-none`,
      className
    )}
    {...props}>
    {children}
    <SelectPrimitive.Icon
      render={<ChevronDownIcon className='pointer-events-none size-4' />}
    />
  </SelectPrimitive.Trigger>
)

const SelectContent = ({
  className,
  children,
  positionerProps,
  ...props
}: SelectPrimitive.Popup.Props & {
  positionerProps?: SelectPrimitive.Positioner.Props
}) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Positioner
      alignItemWithTrigger={false}
      {...positionerProps}
      className='isolate z-1000'>
      <SelectPrimitive.Popup
        className={cn(
          `fade-zoom border-accent bg-white-soft shadow-base dark:bg-black-deep
          dark:border-accent/50 flex min-w-[calc(var(--anchor-width)+2px)]
          flex-col gap-2 rounded-lg border p-4.5`,
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
      `data-selected:text-accent hocus:text-black dark:hocus:text-white
      pointer-cursors:cursor-pointer text-base outline-none
      data-disabled:pointer-events-none data-disabled:cursor-not-allowed
      data-highlighted:text-black dark:text-white/30
      dark:data-highlighted:text-white`,
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
