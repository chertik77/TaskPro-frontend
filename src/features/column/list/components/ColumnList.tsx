import {
  horizontalListSortingStrategy,
  SortableContext
} from '@dnd-kit/sortable'

import { AddColumnTrigger } from '@/features/column/add-column/components'

import { useDragAndDrop } from '@/shared/store'

import { ColumnListItem } from './ColumnListItem'

type ColumnListProps = {
  backgroundIdentifier: string | undefined
}

export const ColumnList = ({ backgroundIdentifier }: ColumnListProps) => {
  const { columns, cards } = useDragAndDrop()

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
