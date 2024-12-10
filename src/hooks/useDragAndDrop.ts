import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import type { Card, Column } from 'types'

import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

import { useUpdateCardsOrder } from './card'
import { useUpdateColumnsOrder } from './column'

const findIndexById = <T extends { id: string }>(array: T[], id: string) =>
  array.findIndex(item => item.id === id)
export const useDragAndDrop = (initialColumns: Column[] | undefined) => {
  const [columns, setColumns] = useState(initialColumns)
  const [cards, setCards] = useState(initialColumns?.flatMap(c => c.cards))
  const [activeCard, setActiveCard] = useState<Card | null>(null)
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const { mutate: updateCardsOrder } = useUpdateCardsOrder()
  const { mutate: updateColumnsOrder } = useUpdateColumnsOrder()
  useEffect(() => {
    setColumns(initialColumns)
    setCards(initialColumns?.flatMap(c => c.cards))
  }, [initialColumns])
  const onDragStart = ({ active }: DragStartEvent) => {
    if (!active) return
    const data = active.data.current
    if (data?.type === 'column') return setActiveColumn(data.column)
    if (data?.type === 'card') return setActiveCard(data.card)
  }
  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return
    const activeId = active.id as string
    const overId = over.id as string
    if (activeId === overId) return
    const isDraggingACard = active.data.current?.type === 'card'
    const isDraggingOverACard = over.data.current?.type === 'card'
    const isDraggingOverAColumn = over.data.current?.type === 'column'
    if (!isDraggingACard) return
    setCards(prevCards => {
      if (!prevCards) return prevCards
      const activeCardIndex = findIndexById(prevCards, activeId)
      const overCardIndex = findIndexById(prevCards, overId)
      if (isDraggingACard && isDraggingOverACard) {
        const activeCard = prevCards[activeCardIndex]
        const overCard = prevCards[overCardIndex]
        if (overCard && activeCard.columnId !== overCard.columnId) {
          activeCard.columnId = overCard.columnId

          return arrayMove(
            prevCards,
            activeCardIndex,
            Math.max(0, overCardIndex - 1)
          )
        }

        return arrayMove(prevCards, activeCardIndex, overCardIndex)
      }
      if (isDraggingACard && isDraggingOverAColumn) {
        prevCards[activeCardIndex].columnId = overId

        return arrayMove(prevCards, activeCardIndex, activeCardIndex)
      }
    })
  }
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveColumn(null)
    setActiveCard(null)
    if (!active || !over || !cards || !columns) return
    const activeId = active.id as string
    const overId = over.id as string
    const isDraggingACard = active.data.current?.type === 'card'
    const isDraggingAColumn = active.data.current?.type === 'column'
    if (isDraggingACard) {
      const overCard = cards.find(c => c.id === overId)
      if (overCard) {
        updateCardsOrder({
          columnId: overCard.columnId,
          ids: cards
            .filter(c => c.columnId === overCard.columnId)
            .map(c => c.id)
        })
      }

      return
    }
    if (isDraggingAColumn) {
      const activeColumnIndex = findIndexById(columns, activeId)
      const overColumnIndex = findIndexById(columns, overId)
      if (activeColumnIndex === overColumnIndex) return
      const updatedColumns = arrayMove(
        columns,
        activeColumnIndex,
        overColumnIndex
      )
      setColumns(updatedColumns)
      updateColumnsOrder({
        boardId: updatedColumns[activeColumnIndex].boardId,
        ids: updatedColumns.map(c => c.id)
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
