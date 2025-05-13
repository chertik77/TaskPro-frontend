import type { CardTypes } from '@/entities/card'
import type { ColumnTypes } from '@/entities/column'
import type { DragAndDropContext, DragAndDropProviderProps } from './dnd.types'

import { createContext, useContext, useEffect, useState } from 'react'
import {
  KeyboardSensor,
  MouseSensor,
  pointerWithin,
  rectIntersection,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'

import { useCardDragHandlers } from './hooks/useCardDragHandlers'
import { useColumnDragHandlers } from './hooks/useColumnDragHandlers'
import { useGetAccessabilityAnnouncements } from './hooks/useGetAccessabilityAnnouncements'
import { coordinateGetter } from './utils/coordinateGetter'
import { DndContext } from './utils/dnd-kit.typesafe'

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

  const cardDragHandlers = useCardDragHandlers({
    cards,
    setActiveCard,
    setCards
  })

  const columnDragHandlers = useColumnDragHandlers({
    columns,
    setActiveColumn,
    setColumns
  })

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 }
    }),
    useSensor(KeyboardSensor, { coordinateGetter })
  )

  const announcements = useGetAccessabilityAnnouncements({ columns, cards })

  return (
    <DragAndDropContext.Provider
      value={{ columns, cards, activeCard, activeColumn }}>
      <DndContext
        sensors={sensors}
        collisionDetection={args => {
          const pointerCollisions = pointerWithin(args)

          if (pointerCollisions.length > 0) return pointerCollisions

          return rectIntersection(args)
        }}
        accessibility={{ announcements }}
        onDragStart={e => {
          cardDragHandlers.onDragStart(e)
          columnDragHandlers.onDragStart(e)
        }}
        onDragOver={cardDragHandlers.onDragOver}
        onDragEnd={e => {
          cardDragHandlers.onDragEnd(e)
          columnDragHandlers.onDragEnd(e)
        }}>
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
