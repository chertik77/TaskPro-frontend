import {
  horizontalListSortingStrategy,
  SortableContext
} from '@dnd-kit/sortable'
import { useDragAndDrop } from 'context/dnd.context'

import { BoardAddColumnBtn } from './BoardAddColumnBtn'
import { BoardColumnsItem } from './BoardColumnsItem'

type BoardColumnsListProps = {
  backgroundIdentifier: string | undefined
}

export const BoardColumnsList = ({
  backgroundIdentifier
}: BoardColumnsListProps) => {
  const { columns, cards, columnsIds } = useDragAndDrop()

  return (
    <div className='flex touch-manipulation gap-[34px]'>
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
        <BoardAddColumnBtn />
      </SortableContext>
    </div>
  )
}
