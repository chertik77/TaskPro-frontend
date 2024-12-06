import type { Column } from 'types'

import { useMemo } from 'react'
import {
  horizontalListSortingStrategy,
  SortableContext
} from '@dnd-kit/sortable'

import { DragAndDropProvider } from '../DragAndDropProvider'
import { BoardAddColumnBtn } from './BoardAddColumnBtn'
import { BoardColumnsItem } from './BoardColumnsItem'

type BoardColumnsListProps = {
  initialColumns: Column[] | undefined
  backgroundIdentifier: string | undefined
}

export const BoardColumnsList = ({
  initialColumns,
  backgroundIdentifier
}: BoardColumnsListProps) => {
  const columnsIds = useMemo(
    () => initialColumns?.map(c => c.id),
    [initialColumns]
  )

  return (
    <div className='flex touch-manipulation gap-[34px]'>
      <DragAndDropProvider initialColumns={initialColumns}>
        {({ columns, cards }) => (
          <>
            <SortableContext
              items={columnsIds || []}
              strategy={horizontalListSortingStrategy}>
              {columns?.map(column => (
                <BoardColumnsItem
                  column={column}
                  key={column.id}
                  cards={cards?.filter(card => card.columnId === column.id)}
                  backgroundIdentifier={backgroundIdentifier}
                />
              ))}
            </SortableContext>
            <BoardAddColumnBtn />
          </>
        )}
      </DragAndDropProvider>
    </div>
  )
}
