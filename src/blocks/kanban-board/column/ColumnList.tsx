import { useDndMonitor } from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext
} from '@dnd-kit/sortable'

import { useColumnDragHandlers } from '@/features/column'
import { AddColumnTrigger } from '@/features/column/add-column'

import { useDragAndDrop } from '@/entities/dnd'

import { ColumnListItem } from './ColumnListItem'

type ColumnListProps = {
  backgroundIdentifier: string | undefined
}

export const ColumnList = ({ backgroundIdentifier }: ColumnListProps) => {
  const { columns, cards } = useDragAndDrop()

  useDndMonitor(useColumnDragHandlers())

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
}
