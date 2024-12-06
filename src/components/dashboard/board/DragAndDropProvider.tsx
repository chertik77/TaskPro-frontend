import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import type { ReactNode } from 'react'
import type { Card, Column } from 'types'

import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { createPortal } from 'react-dom'

import { useCardDragHandlers } from 'hooks/card'
import { useColumnDragHandlers } from 'hooks/column'

import { collisionDetectionAlgorithm } from 'lib'

import { BoardCard } from './cards/BoardCard'
import { BoardColumnsItem } from './columns/BoardColumnsItem'

type Children = {
  columns: Column[] | undefined
  cards: Card[] | undefined
}

type DragAndDropProviderProps = {
  children: ({ columns, cards }: Children) => ReactNode
  initialColumns: Column[] | undefined
}

export const DragAndDropProvider = ({
  children,
  initialColumns
}: DragAndDropProviderProps) => {
  const [columns, setColumns] = useState(initialColumns)
  const [cards, setCards] = useState(initialColumns?.flatMap(c => c.cards))

  const [activeCard, setActiveCard] = useState<Card | null>(null)
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)

  const cardHandlers = useCardDragHandlers({ cards, setCards, setActiveCard })
  const columnHandlers = useColumnDragHandlers({
    columns,
    setColumns,
    setActiveColumn
  })

  const onDragStart = (event: DragStartEvent) => {
    if (!event.active) return

    const data = event.active.data.current

    if (data?.type === 'column') columnHandlers.onDragStart(event)

    if (data?.type === 'card') cardHandlers.onDragStart(event)
  }

  const onDragOver = (event: DragOverEvent) => {
    const data = event.active.data.current

    if (data?.type === 'card') cardHandlers.onDragOver(event)
  }

  const onDragEnd = (event: DragEndEvent) => {
    const data = event.active.data.current

    if (data?.type === 'column') columnHandlers.onDragEnd(event)

    if (data?.type === 'card') cardHandlers.onDragEnd(event)
  }

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 8, delay: 250, tolerance: 5 }
    })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionAlgorithm}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}>
      {children({ columns, cards })}
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
  )
}
