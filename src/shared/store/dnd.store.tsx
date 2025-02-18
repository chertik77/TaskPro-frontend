import type { CardTypes } from '@/entities/card'
import type { ColumnTypes } from '@/entities/column'
import type { Dispatch, ReactNode, SetStateAction } from 'react'

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

type DragAndDropContext = {
  setColumns: Dispatch<SetStateAction<ColumnTypes.Column[] | undefined>>
  setCards: Dispatch<SetStateAction<CardTypes.Card[] | undefined>>
  columns: ColumnTypes.Column[] | undefined
  cards: CardTypes.Card[] | undefined
  activeCard: CardTypes.Card | null
  activeColumn: ColumnTypes.Column | null
  setActiveCard: Dispatch<SetStateAction<CardTypes.Card | null>>
  setActiveColumn: Dispatch<SetStateAction<ColumnTypes.Column | null>>
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
        collisionDetection={args => {
          const type = args.active.data.current?.type

          return type === 'column'
            ? rectIntersection(args)
            : pointerWithin(args)
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
