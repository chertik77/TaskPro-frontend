import { useMemo } from 'react'
import {
  horizontalListSortingStrategy,
  SortableContext
} from '@dnd-kit/sortable'

import { AddColumnTrigger } from '@/features/column/add-column'
import { useDragAndDrop } from '@/features/drag-and-drop'

import { ColumnListItem } from './ColumnListItem'

type ColumnListProps = {
  backgroundURL: string | null | undefined
}

export const ColumnList = ({ backgroundURL }: ColumnListProps) => {
  const { columns } = useDragAndDrop()

  const columnsIds = useMemo(() => columns?.map(c => c.id), [columns])

  return (
    <ul className='desktop:pl-6 tablet:pl-8 flex touch-manipulation gap-[34px] pl-5'>
      <SortableContext
        items={columnsIds || []}
        strategy={horizontalListSortingStrategy}>
        {columns?.map(column => (
          <ColumnListItem
            column={column}
            key={column.id}
            backgroundURL={backgroundURL}
          />
        ))}
        <AddColumnTrigger />
      </SortableContext>
    </ul>
  )
}
