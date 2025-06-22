import type { DragAndDropContext, DragAndDropProviderProps } from './types'

import { createContext, use, useMemo } from 'react'
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'

import { coordinateGetter } from '../lib/coordinateGetter'
import { useGetAccessibilityAnnouncements } from '../lib/useGetAccessibilityAnnouncements'
import { useCardDragHandlers } from './useCardDragHandlers'
import { useColumnDragHandlers } from './useColumnDragHandlers'
import { useDndState } from './useDndState'

const DragAndDropContext = createContext<DragAndDropContext | null>(null)

export const DragAndDropProvider = ({
  children,
  initialColumns
}: DragAndDropProviderProps) => {
  const {
    columns,
    cards,
    activeColumn,
    activeCard,
    setActiveColumn,
    setActiveCard,
    setColumns,
    setCards
  } = useDndState(initialColumns)

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
