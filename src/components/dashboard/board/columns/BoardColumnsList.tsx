import type { Column } from 'types'

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
}: BoardColumnsListProps) => (
  <DragAndDropProvider initialColumns={initialColumns}>
    {({ columns, cards, columnsIds, cardsIds }) => (
      <div className='flex touch-manipulation gap-[34px]'>
        <SortableContext
          items={columnsIds || []}
          strategy={horizontalListSortingStrategy}>
          {columns?.map(column => (
            <BoardColumnsItem
              column={column}
              key={column.id}
              cardsIds={cardsIds}
              cards={cards?.filter(card => card.columnId === column.id)}
              backgroundIdentifier={backgroundIdentifier}
            />
          ))}
          <BoardAddColumnBtn />
        </SortableContext>
      </div>
    )}
  </DragAndDropProvider>
)
