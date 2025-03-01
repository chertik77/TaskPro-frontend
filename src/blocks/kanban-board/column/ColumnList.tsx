import { memo } from 'react'
import { useDndMonitor } from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext
} from '@dnd-kit/sortable'

import { useCardDragHandlers } from '@/features/card/move-card'
import { AddColumnTrigger } from '@/features/column/add-column'
import { useColumnDragHandlers } from '@/features/column/move-column'

import { Draggable, useDragAndDrop } from '@/entities/dnd'

import { cn } from '@/shared/lib/cn'

import { ColumnDraggingState, ColumnListItem } from './ColumnListItem'

type ColumnListProps = {
  backgroundIdentifier: string | undefined
}

export const ColumnList = memo(({ backgroundIdentifier }: ColumnListProps) => {
  const { columns, cards } = useDragAndDrop()

  const cardHandlers = useCardDragHandlers()

  const columnHandlers = useColumnDragHandlers()

  useDndMonitor({
    onDragOver: cardHandlers.onDragOver,
    onDragStart: e => {
      cardHandlers.onDragStart(e)
      columnHandlers.onDragStart(e)
    },
    onDragEnd: e => {
      cardHandlers.onDragEnd(e)
      columnHandlers.onDragEnd(e)
    }
  })

  return (
    <ul className='flex touch-manipulation gap-[34px]'>
      <SortableContext
        items={columns || []}
        strategy={horizontalListSortingStrategy}>
        {columns?.map(column => (
          <Draggable
            entity={column}
            key={column.id}
            draggableType='column'
            WhileDraggingComponent={ColumnDraggingState}>
            {({ setNodeRef, style, attributes, listeners, isDragging }) => (
              <li
                className={cn(
                  'w-[334px] cursor-grab touch-manipulation focus-visible:outline-none',
                  isDragging && 'select-none'
                )}
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}>
                <ColumnListItem
                  column={column}
                  cards={cards?.filter(c => c.columnId === column.id)}
                  backgroundIdentifier={backgroundIdentifier}
                />
              </li>
            )}
          </Draggable>
        ))}
        <AddColumnTrigger />
      </SortableContext>
    </ul>
  )
})
