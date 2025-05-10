import type { ColumnTypes } from '@/entities/column'

import * as ScrollArea from '@radix-ui/react-scroll-area'

import { AddCardModalTrigger } from '@/features/card/add-card'
import { DeleteColumnTrigger } from '@/features/column/delete-column'
import { EditColumnTrigger } from '@/features/column/edit-column'
import { Draggable } from '@/features/drag-and-drop'

import { ColumnDraggingState } from '@/entities/column'

import { useTabletAndBelowMediaQuery } from '@/shared/hooks'
import { cn } from '@/shared/lib/cn'

import { CardList } from '../card/CardList'

type ColumnListItemProps = {
  column: ColumnTypes.ColumnSchema
  backgroundURL?: string | null
}

export const ColumnListItem = ({
  column,
  backgroundURL
}: ColumnListItemProps) => {
  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return (
    <Draggable
      entity={column}
      key={column.id}
      draggableType='column'
      WhileDraggingComponent={ColumnDraggingState}>
      {({ setNodeRef, isDragging, attributes, listeners, style }) => (
        <li
          className={cn(
            'w-[334px] cursor-grab touch-manipulation list-none focus-visible:outline-none',
            isDragging && 'select-none'
          )}
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}>
          <div
            className='mb-3.5 flex h-14 items-center justify-center rounded-lg bg-white px-5 py-4.5
              dark:bg-black'>
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
              <CardList currentColumnId={column.id} />
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className='w-2 bg-transparent'>
              <ScrollArea.Thumb
                className={cn(
                  'rounded-[26px] bg-white/60',
                  !backgroundURL &&
                    'bg-gray-light violet:bg-black/20 !w-2 dark:bg-white/10'
                )}
              />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
          <AddCardModalTrigger columnId={column.id} />
        </li>
      )}
    </Draggable>
  )
}
