import type { ComponentPropsWithRef, ComponentType, ReactNode } from 'react'

import { useRef } from 'react'
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox'

import { cn } from '../lib'
import { Icon } from './Icon'

const Combobox = ComboboxPrimitive.Root

const ComboboxValue = ({ ...props }: ComboboxPrimitive.Value.Props) => (
  <ComboboxPrimitive.Value {...props} />
)

const ComboboxContent = ({
  className,
  positionerProps,
  ...props
}: ComboboxPrimitive.Popup.Props & {
  positionerProps?: ComboboxPrimitive.Positioner.Props
}) => (
  <ComboboxPrimitive.Portal className='group'>
    <ComboboxPrimitive.Positioner
      {...positionerProps}
      className='isolate z-50 group-data-base-ui-inert:-z-10'>
      <ComboboxPrimitive.Popup
        className={cn(
          `dark:bg-black-deep data-[side=bottom]:slide-in-from-top-2
          data-[side=inline-end]:slide-in-from-left-2
          data-[side=inline-start]:slide-in-from-right-2
          data-[side=left]:slide-in-from-right-2
          data-[side=right]:slide-in-from-left-2
          data-[side=top]:slide-in-from-bottom-2 data-open:animate-in
          data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out
          data-closed:fade-out-0 data-closed:zoom-out-95 border-brand/30
          violet:border-brand-violet/30 group bg-white-soft shadow-base relative
          z-50 max-h-(--available-height) w-(--anchor-width)
          max-w-(--available-width) origin-(--transform-origin) overflow-hidden
          rounded-lg dark:border`,
          className
        )}
        {...props}
      />
    </ComboboxPrimitive.Positioner>
  </ComboboxPrimitive.Portal>
)

const ComboboxList = ({
  className,
  ...props
}: ComboboxPrimitive.List.Props) => (
  <ComboboxPrimitive.List
    className={cn(
      `max-h-[min(calc(--spacing(50)-(--spacing(9))),calc(var(--available-height)-(--spacing(9))))]
      scroll-py-1 scrollbar-none overflow-y-auto overscroll-contain p-2
      data-empty:p-0`,
      className
    )}
    {...props}
  />
)

const ComboboxItem = ({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) => (
  <ComboboxPrimitive.Item
    className={cn(
      `dark:data-highlighted:bg-black-muted text-md
      violet:data-highlighred:text-brand-violet data-highlighted:bg-white-muted
      relative flex w-full items-center gap-2 rounded-md py-1 pr-8 pl-1.5
      outline-hidden select-none data-disabled:pointer-events-none
      data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0
      [&_svg:not([class*='size-'])]:size-4`,
      className
    )}
    {...props}>
    {children}
    <ComboboxPrimitive.ItemIndicator
      render={
        <span
          className='pointer-events-none absolute right-2 flex size-4
            items-center justify-center'>
          <Icon
            name='check'
            className='stroke-black dark:stroke-white'
          />
        </span>
      }
    />
  </ComboboxPrimitive.Item>
)

const ComboboxEmpty = ({
  className,
  ...props
}: ComboboxPrimitive.Empty.Props) => (
  <ComboboxPrimitive.Empty
    className={cn(
      `text-md hidden w-full justify-center py-2 text-center
      group-data-empty:flex`,
      className
    )}
    {...props}
  />
)

const ComboboxChips = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props) => (
  <ComboboxPrimitive.Chips
    className={cn(
      `border-brand/40 focus-within:border-brand violet:border-brand-violet/40
      violet:focus-within:border-brand-violet flex min-h-12 w-full flex-wrap
      items-center gap-1 rounded-lg border px-2.5 py-1
      supports-[-webkit-overflow-scrolling:touch]:text-lg`,
      className
    )}
    {...props}
  />
)

const ComboboxChip = ({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) => (
  <ComboboxPrimitive.Chip
    className={cn(
      `text-md dark:bg-gray/20 bg-white-muted flex h-[calc(--spacing(6))] w-fit
      items-center justify-center gap-1 rounded-sm px-1.5 py-2 whitespace-nowrap
      has-disabled:pointer-events-none has-disabled:cursor-not-allowed
      has-disabled:opacity-50`,
      className
    )}
    {...props}>
    {children}
    {showRemove && (
      <ComboboxPrimitive.ChipRemove className='opacity-50 hover:opacity-100'>
        <Icon
          name='close'
          className='size-3'
        />
      </ComboboxPrimitive.ChipRemove>
    )}
  </ComboboxPrimitive.Chip>
)

const ComboboxChipsInput = ({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) => (
  <ComboboxPrimitive.Input
    className={cn(
      'min-w-16 flex-1 px-2.5 outline-none placeholder:opacity-40',
      className
    )}
    {...props}
  />
)

const useComboboxAnchorRef = () => useRef<HTMLDivElement | null>(null)

const createTypeSafeCombobox = <TItem, TValue>() => ({
  Root: Combobox as ComponentType<
    Omit<
      ComboboxPrimitive.Root.Props<TValue, boolean>,
      'items' | 'onValueChange' | 'filter'
    > & {
      onValueChange?: (value: TValue[]) => void
      filter?: (item: TItem, input: string) => boolean
      items?: TItem[]
    }
  >,
  Value: ComboboxValue as ComponentType<{
    children?: (value: TValue[]) => ReactNode
  }>,
  List: ComboboxList as ComponentType<
    Omit<ComboboxPrimitive.List.Props, 'children'> & {
      children?: ReactNode | ((item: TItem, index: number) => ReactNode)
    }
  >,
  Item: ComboboxItem as ComponentType<
    Omit<ComboboxPrimitive.Item.Props, 'value'> & { value?: TValue }
  >,
  Content: ComboboxContent,
  Empty: ComboboxEmpty,
  Chips: ComboboxChips,
  Chip: ComboboxChip,
  ChipsInput: ComboboxChipsInput
})

export { createTypeSafeCombobox, useComboboxAnchorRef }
