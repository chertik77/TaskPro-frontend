import type { CardTypes } from '@/entities/card'
import type { ColumnTypes } from '@/entities/column'
import type { HTMLAttributes } from 'react'

import { forwardRef } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'

import { AddCardModalTrigger } from '@/features/card/add-card'
import { DeleteColumnTrigger } from '@/features/column/delete-column'
import { EditColumnTrigger } from '@/features/column/edit-column'

import { Draggable } from '@/entities/dnd'

import { useTabletAndBelowMediaQuery } from '@/shared/hooks'
import { cn } from '@/shared/lib/cn'

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
    ref={ref}
    {...props}
    className='w-[334px] rounded-lg border-2 border-brand bg-white-gray opacity-60
      violet:border-brand-violet dark:bg-black'
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
              `mb-3.5 flex h-14 min-w-84 items-center justify-center rounded-lg bg-white px-5
              py-4.5 dark:bg-black`
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
            <ScrollArea.Scrollbar className='w-2 bg-transparent'>
              <ScrollArea.Thumb
                className={cn(
                  'rounded-[26px] bg-white/60',
                  backgroundIdentifier === 'default' &&
                    '!w-2 bg-gray-light violet:bg-black/20 dark:bg-white/10'
                )}
              />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
          <AddCardModalTrigger columnId={column.id} />
        </div>
      )}
    </Draggable>
  )
}
