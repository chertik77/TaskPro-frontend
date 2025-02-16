import type { CardTypes } from '@/shared/api/card'
import type { ColumnTypes } from '@/shared/api/column'
import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import type { Dispatch, ReactNode, SetStateAction } from 'react'

import { createContext, useContext, useEffect, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  pointerWithin,
  rectIntersection,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { createPortal } from 'react-dom'

import { useCardDragHandlers } from '@/features/card/hooks'
import { useColumnDragHandlers } from '@/features/column/hooks'

import { CardListItem } from '@/blocks/kanban/card'
import { ColumnListItem } from '@/blocks/kanban/column'

export type DragAndDropContext = {
  setColumns: Dispatch<SetStateAction<ColumnTypes.Column[] | undefined>>
  setCards: Dispatch<SetStateAction<CardTypes.Card[] | undefined>>
  columns: ColumnTypes.Column[] | undefined
  cards: CardTypes.Card[] | undefined
}

type DragAndDropProviderProps = {
  children: ReactNode
  initialColumns: ColumnTypes.Column[] | undefined
}

const DragAndDropContext = createContext<DragAndDropContext | null>(null)

export const DragAndDropProvider = ({
  children,
  initialColumns
}: DragAndDropProviderProps) => {
  const [columns, setColumns] = useState(initialColumns)
  const [cards, setCards] = useState(initialColumns?.flatMap(c => c.cards))

  const [activeCard, setActiveCard] = useState<CardTypes.Card | null>(null)
  const [activeColumn, setActiveColumn] = useState<ColumnTypes.Column | null>(
    null
  )

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

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 8, delay: 250, tolerance: 5 }
    })
  )

  return (
    <DragAndDropContext.Provider
      value={{ setColumns, setCards, columns, cards }}>
      <DndContext
        sensors={sensors}
        collisionDetection={args => {
          const type = args.active.data.current?.type

          return type === 'column'
            ? rectIntersection(args)
            : pointerWithin(args)
        }}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}>
        {children}
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnListItem
                column={activeColumn}
                cards={cards?.filter(c => c.columnId === activeColumn.id)}
              />
            )}
            {activeCard && <CardListItem card={activeCard} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </DragAndDropContext.Provider>
  )
}

export const useDragAndDrop = () => {
  const context = useContext(DragAndDropContext)

  if (!context) {
    throw new Error('useDragAndDrop must be used within a DragAndDropProvider')
  }

  return context
}
