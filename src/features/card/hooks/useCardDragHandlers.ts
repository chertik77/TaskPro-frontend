import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'

import { arrayMove } from '@dnd-kit/sortable'

import { useDragAndDrop } from '@/shared/store'
import { findIndexById } from '@/shared/utils'

import { useUpdateCardsOrder } from './useUpdateCardsOrder'

export const useCardDragHandlers = () => {
  const { cards, setCards, setActiveCard } = useDragAndDrop()

  const { mutate: updateCardsOrder } = useUpdateCardsOrder()

  const onDragStart = ({ active }: DragStartEvent) => {
    if (!active || active.data.current?.type !== 'card') return

    setActiveCard(active.data.current?.card)
  }

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (
      !over ||
      active.id === over.id ||
      active.data.current?.type !== 'card'
    ) {
      return
    }

    const isDraggingOverACard = over.data.current?.type === 'card'
    const isDraggingOverAColumn = over.data.current?.type === 'column'

    setCards(prevCards => {
      if (!prevCards) return prevCards

      const activeCardIndex = findIndexById(prevCards, active.id as string)
      const overCardIndex = findIndexById(prevCards, over.id as string)

      if (isDraggingOverACard) {
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

      if (isDraggingOverAColumn) {
        prevCards[activeCardIndex].columnId = over.id as string

        return arrayMove(prevCards, activeCardIndex, activeCardIndex)
      }
    })
  }

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!active || active.data.current?.type !== 'card') return

    setActiveCard(null)

    if (!cards || !over) return

    const overCard = cards.find(c => c.id === over.id)

    if (overCard) {
      updateCardsOrder({
        columnId: overCard.columnId,
        ids: cards.filter(c => c.columnId === overCard.columnId).map(c => c.id)
      })
    }
  }

  return { onDragStart, onDragOver, onDragEnd }
}
