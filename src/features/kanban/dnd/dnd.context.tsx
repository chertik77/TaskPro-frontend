import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import type { Card } from 'features/kanban/card/card.types'
import type { Column } from 'features/kanban/column/column.types'
import type { Dispatch, ReactNode, SetStateAction } from 'react'

import { createContext, useEffect, useMemo, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { createPortal } from 'react-dom'

import { BoardCard } from 'features/kanban/card/components'
import { useCardDragHandlers } from 'features/kanban/card/hooks'
import { BoardColumnsItem } from 'features/kanban/column/components/BoardColumnsItem'
import { useColumnDragHandlers } from 'features/kanban/column/hooks'

import { collisionDetectionAlgorithm } from './utils'

export type DragAndDropContext = {
  setColumns: Dispatch<SetStateAction<Column[] | undefined>>
  setCards: Dispatch<SetStateAction<Card[] | undefined>>
  columns: Column[] | undefined
  cards: Card[] | undefined
  columnsIds: string[] | undefined
  cardsIds: string[] | undefined
}

type DragAndDropProviderProps = {
  children: ReactNode
  initialColumns: Column[] | undefined
}

export const DragAndDropContext = createContext<DragAndDropContext | null>(null)

export const DragAndDropProvider = ({
  children,
  initialColumns
}: DragAndDropProviderProps) => {
  const [columns, setColumns] = useState(initialColumns)
  const [cards, setCards] = useState(initialColumns?.flatMap(c => c.cards))

  const [activeCard, setActiveCard] = useState<Card | null>(null)
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)

  useEffect(() => {
    setColumns(initialColumns)
    setCards(initialColumns?.flatMap(c => c.cards))
  }, [initialColumns])

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

  const columnsIds = useMemo(() => columns?.map(col => col.id), [columns])
  const cardsIds = useMemo(() => cards?.map(c => c.id), [cards])

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 8, delay: 250, tolerance: 5 }
    })
  )

  return (
    <DragAndDropContext.Provider
      value={{ setColumns, setCards, columns, cards, columnsIds, cardsIds }}>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetectionAlgorithm}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}>
        {children}
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <BoardColumnsItem
                column={activeColumn}
                cards={cards?.filter(c => c.columnId === activeColumn.id)}
              />
            )}
            {activeCard && <BoardCard card={activeCard} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </DragAndDropContext.Provider>
  )
}
