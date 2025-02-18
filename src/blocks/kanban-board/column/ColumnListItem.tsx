import type { CardTypes } from '@/entities/card'
import type { ColumnTypes } from '@/entities/column'
import type { HTMLAttributes } from 'react'

import { forwardRef } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'

import { AddCardModalTrigger } from '@/features/card/add-card'
import { DeleteColumnTrigger } from '@/features/column/delete-column'
import { EditColumnTrigger } from '@/features/column/edit-column'

import { Draggable } from '@/entities/dnd'

import { Scrollbar } from '@/shared/components'
import { useTabletAndBelowMediaQuery } from '@/shared/hooks'
import { cn } from '@/shared/lib'

import { CardList } from '../card/CardList'

type ColumnListItemProps = {
  column: ColumnTypes.Column
  cards: CardTypes.Card[] | undefined
  backgroundIdentifier?: string
}

const WhileDraggingComponent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>((props, ref) => (
  <div
    {...props}
    className='w-[334px] rounded-lg border-2 border-brand bg-white-gray-secondary opacity-60
      violet:border-brand-secondary dark:bg-black'
    ref={ref}
  />
))

export const ColumnListItem = ({
  column,
  cards,
  backgroundIdentifier
}: ColumnListItemProps) => {
  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return (
    <Draggable
      entity={column}
      draggableType='column'
      WhileDraggingComponent={WhileDraggingComponent}>
      {({ setNodeRef, style, attributes, listeners, isDragging }) => (
        <div
          className={cn(
            `flex w-[334px] cursor-grab touch-manipulation flex-col
            focus-visible:outline-none`,
            isDragging && 'select-none'
          )}
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}>
          <div
            className={cn(
              `mb-3.5 flex h-3xl min-w-8xl items-center justify-center rounded-lg bg-white px-5
              py-lg dark:bg-black`
            )}>
            {column.title}
            <EditColumnTrigger column={column} />
            <DeleteColumnTrigger columnId={column.id} />
          </div>
          <ScrollArea.Root
            type='scroll'
            className={cn('-mr-4 pr-4', {
              'h-[calc(100dvh-275px)]': !isTabletAndBelow,
              'h-[calc(100dvh-300px)]': isTabletAndBelow
            })}>
            <ScrollArea.Viewport className='h-full'>
              <CardList cards={cards} />
            </ScrollArea.Viewport>
            <Scrollbar
              backgroundIdentifier={backgroundIdentifier}
              scrollBarClassName='w-2'
              thumbClassName='!w-2'
            />
          </ScrollArea.Root>
          <AddCardModalTrigger columnId={column.id} />
        </div>
      )}
    </Draggable>
  )
}
