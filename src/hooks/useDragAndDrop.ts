import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import type { Card, Column } from 'types'

import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

import { useUpdateCardsOrder } from './card'
import { useUpdateColumnsOrder } from './column'

export const useDragAndDrop = (initialColumns: Column[] | undefined) => {
  const [columns, setColumns] = useState(initialColumns)

  const [cards, setCards] = useState(initialColumns?.flatMap(c => c.cards))

  const [activeCard, setActiveCard] = useState<Card | null>(null)

  const [activeColumn, setActiveColumn] = useState<Column | null>(null)

  const { mutate: updateCardsOrder } = useUpdateCardsOrder()
  const { mutate: updateColumnsOrder } = useUpdateColumnsOrder()

  useEffect(() => {
    setColumns(initialColumns)
  }, [initialColumns])

  useEffect(() => {
    setCards(initialColumns?.flatMap(c => c.cards))
  }, [initialColumns])

  const onDragStart = ({ active }: DragStartEvent) => {
    if (!active) return

    const data = active.data.current

    if (data?.type === 'column') {
      return setActiveColumn(data.column)
    }

    if (data?.type === 'card') {
      return setActiveCard(data.card)
    }
  }

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    if (activeId === overId) return

    const isActiveACard = active.data.current?.type === 'card'
    const isOverACard = over.data.current?.type === 'card'
    const isOverAColumn = over.data.current?.type === 'column'

    if (!isActiveACard) return

    setCards(cards => {
      if (!cards) return cards

      if (isActiveACard && isOverACard) {
        const activeCardIndex = cards.findIndex(c => c.id === activeId)
        const overCardIndex = cards.findIndex(c => c.id === overId)

        if (activeCardIndex === -1 || overCardIndex === -1) return cards

        const activeCard = cards[activeCardIndex]
        const overCard = cards[overCardIndex]

        if (overCard && activeCard.columnId !== overCard.columnId) {
          activeCard.columnId = overCard.columnId

          return arrayMove(
            cards,
            activeCardIndex,
            Math.max(0, overCardIndex - 1)
          )
        }

        return arrayMove(cards, activeCardIndex, overCardIndex)
      }

      if (isActiveACard && isOverAColumn) {
        const activeCardIndex = cards.findIndex(c => c.id === activeId)

        if (activeCardIndex !== -1) {
          cards[activeCardIndex].columnId = overId

          return arrayMove(cards, activeCardIndex, activeCardIndex)
        }

        return cards
      }
    })
  }

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveColumn(null)
    setActiveCard(null)

    if (!over || !cards || !columns) return

    const activeId = active.id as string
    const overId = over.id as string

    const isActiveAColumn = active?.data.current?.type === 'column'

    if (isActiveAColumn && activeId === overId) return

    const activeColumnIndex = columns.findIndex(col => col.id === activeId)
    const overColumnIndex = columns.findIndex(col => col.id === overId)

    const updatedColumns = arrayMove(
      columns,
      activeColumnIndex,
      overColumnIndex
    )

    setColumns(updatedColumns)

    const overColumn = updatedColumns[overColumnIndex]
    const overCard = cards.find(c => c.id === over.id)

    if (overColumn) {
      updateColumnsOrder({
        boardId: overColumn.boardId,
        ids: updatedColumns.map(c => c.id)
      })
    }

    if (overCard) {
      updateCardsOrder({
        columnId: overCard.columnId,
        ids: cards.filter(c => c.columnId === overCard.columnId).map(c => c.id)
      })
    }
  }

  return {
    cards,
    columns,
    activeColumn,
    activeCard,
    onDragStart,
    onDragOver,
    onDragEnd
  }
}
