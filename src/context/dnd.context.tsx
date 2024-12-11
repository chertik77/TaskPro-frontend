import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import type { ReactNode } from 'react'
import type { Card, Column } from 'types'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { createPortal } from 'react-dom'

import { BoardCard } from 'components/dashboard/board/cards/BoardCard'
import { BoardColumnsItem } from 'components/dashboard/board/columns/BoardColumnsItem'

import { useCardDragHandlers, useDeleteCard } from 'hooks/card'
import { useColumnDragHandlers, useDeleteColumn } from 'hooks/column'

import { collisionDetectionAlgorithm } from 'lib'

type DragAndDropContext = {
  columns: Column[] | undefined
  cards: Card[] | undefined
  columnsIds: string[] | undefined
  cardsIds: string[] | undefined
  deleteColumn: (columnId: string) => void
  deleteCard: (cardId: string) => void
}

const DragAndDropContext = createContext<DragAndDropContext | null>(null)

type DragAndDropProviderProps = {
  children: ReactNode
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

  const { mutate: deleteColumnMutation } = useDeleteColumn()
  const { mutate: deleteCardMutation } = useDeleteCard()

  const deleteColumn = useCallback(
    (columnId: string) => {
      setColumns(columns?.filter(col => col.id !== columnId))

      setCards(cards?.filter(c => c.columnId !== columnId))

      deleteColumnMutation(columnId)
    },
    [columns, cards, deleteColumnMutation]
  )

  const deleteCard = useCallback(
    (cardId: string) => {
      setCards(cards?.filter(c => c.id !== cardId))

      deleteCardMutation(cardId)
    },
    [cards, deleteCardMutation]
  )

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

  const contextValue: DragAndDropContext = {
    columns,
    cards,
    cardsIds,
    columnsIds,
    deleteColumn,
    deleteCard
  }

  return (
    <DragAndDropContext.Provider value={contextValue}>
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

export const useDragAndDrop = () => {
  const context = useContext(DragAndDropContext)

  if (!context) {
    throw new Error('useDragAndDrop must be used within a DragAndDropProvider')
  }

  return context
}
