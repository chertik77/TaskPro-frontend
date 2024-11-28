import type { Column } from 'types'

import { useMemo } from 'react'
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext
} from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'

import { useDragAndDrop } from 'hooks'

import { BoardCard } from '../cards/BoardCard'
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
  const {
    columns,
    cards,
    activeColumn,
    activeCard,
    onDragStart,
    onDragOver,
    onDragEnd
  } = useDragAndDrop(initialColumns)

  const columnsIds = useMemo(() => columns?.map(c => c.id), [columns])

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 8, delay: 250, tolerance: 5 }
    })
  )

  return (
    <div className='flex touch-manipulation gap-[34px]'>
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}>
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
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <BoardColumnsItem
                column={activeColumn}
                cards={cards?.filter(card => card.columnId === activeColumn.id)}
              />
            )}
            {activeCard && <BoardCard card={activeCard!} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}
