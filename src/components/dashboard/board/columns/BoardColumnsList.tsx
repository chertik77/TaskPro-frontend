import type { Column } from 'types'

import { DndContext, DragOverlay } from '@dnd-kit/core'
import { createPortal } from 'react-dom'

import { useCardDragAndDrop } from 'hooks/card'

import { BoardCard } from '../cards/BoardCard'
import { BoardAddColumnBtn } from './BoardAddColumnBtn'
import { BoardColumnsItem } from './BoardColumnsItem'

type BoardColumnsListProps = {
  columns: Column[] | undefined
  backgroundIdentifier: string | undefined
}

export const BoardColumnsList = ({
  columns,
  backgroundIdentifier
}: BoardColumnsListProps) => {
  const { cards, activeCard, onDragStart, onDragOver } =
    useCardDragAndDrop(columns)

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragOver={onDragOver}>
      <div className='flex gap-[34px]'>
        {columns?.map(column => (
          <BoardColumnsItem
            column={column}
            key={column.id}
            cards={cards?.filter(card => card.columnId === column.id)}
            backgroundIdentifier={backgroundIdentifier}
          />
        ))}
        <BoardAddColumnBtn />
      </div>
      {createPortal(
        <DragOverlay>
          {activeCard && <BoardCard card={activeCard!} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}
