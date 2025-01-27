import {
  horizontalListSortingStrategy,
  SortableContext
} from '@dnd-kit/sortable'

import { useDragAndDrop } from '@/features/kanban/dnd/hooks'

import { BoardAddColumnBtn } from './BoardAddColumnBtn'
import { BoardColumnsItem } from './BoardColumnsItem'

type BoardColumnsListProps = {
  backgroundIdentifier: string | undefined
}

export const BoardColumnsList = ({
  backgroundIdentifier
}: BoardColumnsListProps) => {
  const { columns, cards } = useDragAndDrop()

  return (
    <div className='flex touch-manipulation gap-[34px]'>
      <SortableContext
        items={columns || []}
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
