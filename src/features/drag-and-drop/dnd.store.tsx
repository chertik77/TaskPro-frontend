import type { CardTypes } from '@/entities/card'
import type { ColumnTypes } from '@/entities/column'
import type { DragAndDropContext, DragAndDropProviderProps } from './dnd.types'

import { createContext, useContext, useEffect, useState } from 'react'
import {
  DndContext,
  MouseSensor,
  pointerWithin,
  rectIntersection,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'

import { useCardDragHandlers } from './hooks/useCardDragHandlers'
import { useColumnDragHandlers } from './hooks/useColumnDragHandlers'

const DragAndDropContext = createContext<DragAndDropContext | null>(null)

export const DragAndDropProvider = ({
  children,
  initialColumns
}: DragAndDropProviderProps) => {
  const [columns, setColumns] = useState(initialColumns)
  const [cards, setCards] = useState(initialColumns?.flatMap(c => c.cards))

  const [activeCard, setActiveCard] = useState<CardTypes.CardSchema | null>(
    null
  )

  const [activeColumn, setActiveColumn] =
    useState<ColumnTypes.ColumnSchema | null>(null)

  useEffect(() => {
    setColumns(initialColumns)
    setCards(initialColumns?.flatMap(c => c.cards))
  }, [initialColumns])

  const cardHandlers = useCardDragHandlers({ cards, setActiveCard, setCards })

  const columnHandlers = useColumnDragHandlers({
    columns,
    setActiveColumn,
    setColumns
  })

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 8, delay: 250, tolerance: 5 }
    })
  )

  return (
    <DragAndDropContext.Provider
      value={{ columns, cards, activeCard, activeColumn }}>
      <DndContext
        sensors={sensors}
        onDragStart={e => {
          cardHandlers.onDragStart(e)
          columnHandlers.onDragStart(e)
        }}
        onDragOver={cardHandlers.onDragOver}
        onDragEnd={e => {
          cardHandlers.onDragEnd(e)
          columnHandlers.onDragEnd(e)
        }}
        collisionDetection={args =>
          args.active.data.current?.type === 'column'
            ? rectIntersection(args)
            : pointerWithin(args)
        }>
        {children}
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
