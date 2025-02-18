import type { Card } from '@/entities/card/@x/dnd'
import type { Column } from '@/entities/column/@x/dnd'
import type { DragAndDropContext, DragAndDropProviderProps } from './types'

import { createContext, useContext, useEffect, useState } from 'react'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'

import { collisionDetection } from './utils'

const DragAndDropContext = createContext<DragAndDropContext | null>(null)

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

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 8, delay: 250, tolerance: 5 }
    })
  )

  return (
    <DragAndDropContext.Provider
      value={{
        setColumns,
        setCards,
        columns,
        cards,
        activeCard,
        activeColumn,
        setActiveCard,
        setActiveColumn
      }}>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}>
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
