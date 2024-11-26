import type { Column } from 'types'

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors
} from '@dnd-kit/core'
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
  const { cards, activeCard, onDragStart, onDragOver, onDragEnd } =
    useCardDragAndDrop(columns)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  return (
    <div className='flex gap-[34px]'>
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}>
        {columns?.map(column => (
          <BoardColumnsItem
            column={column}
            key={column.id}
            cards={cards?.filter(card => card.columnId === column.id)}
            backgroundIdentifier={backgroundIdentifier}
          />
        ))}
        <BoardAddColumnBtn />
        {createPortal(
          <DragOverlay>
            {activeCard && <BoardCard card={activeCard!} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}
