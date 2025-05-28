import type { CardTypes } from '@/entities/card'
import type { ColumnTypes } from '@/entities/column'
import type { DragAndDropContext, DragAndDropProviderProps } from './dnd.types'

import { createContext, use, useMemo, useState } from 'react'
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'

import { useCardDragHandlers } from './hooks/useCardDragHandlers'
import { useColumnDragHandlers } from './hooks/useColumnDragHandlers'
import { useGetAccessibilityAnnouncements } from './hooks/useGetAccessibilityAnnouncements'
import { collisionDetection } from './utils/collisionDetection'
import { coordinateGetter } from './utils/coordinateGetter'

const DragAndDropContext = createContext<DragAndDropContext | null>(null)

export const DragAndDropProvider = ({
  children,
  initialColumns
}: DragAndDropProviderProps) => {
  const [columns, setColumns] = useState(initialColumns)
  const [cards, setCards] = useState(initialColumns?.flatMap(c => c.cards))
  const [prevInitialColumns, setPrevInitialColumns] = useState(initialColumns)

  const [activeCard, setActiveCard] = useState<CardTypes.CardSchema | null>(
    null
  )

  const [activeColumn, setActiveColumn] =
    useState<ColumnTypes.ColumnSchema | null>(null)

  if (initialColumns !== prevInitialColumns) {
    setPrevInitialColumns(initialColumns)
    setColumns(initialColumns)
    setCards(initialColumns?.flatMap(c => c.cards))
  }

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
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter })
  )

  const announcements = useGetAccessibilityAnnouncements({ columns, cards })

  const value = useMemo(
    () => ({ columns, cards, activeCard, activeColumn }),
    [columns, cards, activeCard, activeColumn]
  )

  return (
    <DragAndDropContext value={value}>
      <DndContext
        sensors={sensors}
        accessibility={{ announcements }}
        collisionDetection={collisionDetection}
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
    </DragAndDropContext>
  )
}

export const useDragAndDrop = () => {
  const context = use(DragAndDropContext)

  if (!context) {
    throw new Error('useDragAndDrop must be used within a DragAndDropProvider')
  }

  return context
}
