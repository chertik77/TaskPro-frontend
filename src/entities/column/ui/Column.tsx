import type { ComponentProps, ReactNode } from 'react'
import type { ColumnSchema } from '../model/types'

import { createContext, use, useMemo } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Slot } from '@radix-ui/react-slot'

import { cn, useTabletAndBelowMediaQuery } from '@/shared/lib'
import { Icon } from '@/shared/ui'

type ColumnContext = {
  column: ColumnSchema
}

const ColumnContext = createContext<ColumnContext | undefined>(undefined)

const useColumnContext = () => {
  const context = use(ColumnContext)

  if (!context) {
    throw new Error(
      'useColumnContext must be used with a ColumnContext.Provider'
    )
  }

  return context
}

type ColumnProviderProps = ColumnContext & {
  children: ReactNode
}

const ColumnProvider = ({ column, children }: ColumnProviderProps) => {
  const value = useMemo(() => ({ column }), [column])

  return <ColumnContext value={value}>{children}</ColumnContext>
}

const ColumnHeader = ({
  className,
  children,
  ...props
}: ComponentProps<'div'>) => (
  <div
    className={cn(
      'min-h-14 rounded-lg bg-white px-5 py-4.5 dark:bg-black',
      className
    )}
    {...props}>
    {children}
  </div>
)

const ColumnDragActivator = ({
  className,
  ...props
}: ComponentProps<'button'>) => (
  <button
    type='button'
    className={cn('focus-visible:styled-outline cursor-grab', className)}
    aria-label='Move column'
    {...props}>
    <Icon
      name='drag'
      className='dark:stroke-white-soft/50 size-5 stroke-black/50'
    />
  </button>
)

const ColumnTitle = ({ className, ...props }: ComponentProps<'p'>) => {
  const { column } = useColumnContext()

  return (
    <p
      className={cn('truncate', className)}
      {...props}>
      {column.title}
    </p>
  )
}

const ColumnScrollArea = ({
  children,
  className,
  ...props
}: ScrollArea.ScrollAreaProps) => {
  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return (
    <ScrollArea.Root
      type='scroll'
      className={cn('-mr-4 pr-4', className, {
        'h-[calc(100dvh-275px)]': !isTabletAndBelow,
        'h-[calc(100dvh-300px)]': isTabletAndBelow
      })}
      {...props}>
      {children}
    </ScrollArea.Root>
  )
}

const ColumnScrollAreaViewport = ({
  children,
  className,
  ...props
}: ScrollArea.ScrollAreaViewportProps) => (
  <ScrollArea.Viewport
    className={cn('h-full', className)}
    {...props}>
    {children}
  </ScrollArea.Viewport>
)

const ColumnScrollAreaScrollbar = ({
  className,
  children,
  ...props
}: ScrollArea.ScrollAreaScrollbarProps) => (
  <ScrollArea.Scrollbar
    className={cn('w-2 bg-transparent', className)}
    {...props}>
    {children}
  </ScrollArea.Scrollbar>
)

const ColumnScrollAreaThumb = ({
  className,
  ...props
}: ScrollArea.ScrollAreaThumbProps) => (
  <ScrollArea.Thumb
    className={cn('rounded-[26px] bg-white/60', className)}
    {...props}
  />
)

type ColumnActionButtonProps = ComponentProps<'button'> & {
  asChild?: boolean
}

const ColumnActionButton = ({
  className,
  asChild,
  ref,
  ...props
}: ColumnActionButtonProps) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      type='button'
      className={cn(
        `focus-visible:styled-outline hocus:text-black
        dark:hocus:text-white-soft dark:text-white-soft/50 text-black/50
        [&_svg]:size-4`,
        className
      )}
      ref={ref}
      {...props}
    />
  )
}

export const Column = Object.assign(ColumnProvider, {
  Header: ColumnHeader,
  DragActivator: ColumnDragActivator,
  Title: ColumnTitle,
  ScrollArea: ColumnScrollArea,
  ScrollAreaViewport: ColumnScrollAreaViewport,
  ScrollAreaScrollbar: ColumnScrollAreaScrollbar,
  ScrollAreaThumb: ColumnScrollAreaThumb,
  ActionButton: ColumnActionButton
})
