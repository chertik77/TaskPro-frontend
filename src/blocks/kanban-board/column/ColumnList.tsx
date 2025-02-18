import { memo } from 'react'
import { useDndMonitor } from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext
} from '@dnd-kit/sortable'

import { useCardDragHandlers } from '@/features/card'
import { useColumnDragHandlers } from '@/features/column'
import { AddColumnTrigger } from '@/features/column/add-column'

import { useDragAndDrop } from '@/entities/dnd'

import { ColumnListItem } from './ColumnListItem'

type ColumnListProps = {
  backgroundIdentifier: string | undefined
}

export const ColumnList = memo(({ backgroundIdentifier }: ColumnListProps) => {
  const { columns, cards } = useDragAndDrop()

  const cardHandlers = useCardDragHandlers()

  const columnHandlers = useColumnDragHandlers()

  useDndMonitor({
    onDragStart: e => {
      cardHandlers.onDragStart(e)
      columnHandlers.onDragStart(e)
    },
    onDragOver: e => {
      cardHandlers.onDragOver(e)
    },
    onDragEnd: e => {
      cardHandlers.onDragEnd(e)
      columnHandlers.onDragEnd(e)
    }
  })

  return (
    <div className='flex touch-manipulation gap-[34px]'>
      <SortableContext
        items={columns || []}
        strategy={horizontalListSortingStrategy}>
        {columns?.map(column => (
          <ColumnListItem
            column={column}
            key={column.id}
            cards={cards?.filter(card => card.columnId === column.id)}
            backgroundIdentifier={backgroundIdentifier}
          />
        ))}
        <AddColumnTrigger />
      </SortableContext>
    </div>
  )
})
