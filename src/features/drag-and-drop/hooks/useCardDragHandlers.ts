import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import type { CardDragHandlersProps } from '../dnd.types'

import { arrayMove } from '@dnd-kit/sortable'

import { findIndexById } from '@/shared/utils'

import { useUpdateCardOrder } from './useUpdateCardOrder'

export const useCardDragHandlers = ({
  cards,
  setCards,
  setActiveCard
}: CardDragHandlersProps) => {
  const { mutate: updateCardOrder } = useUpdateCardOrder()

  const onDragStart = ({ active }: DragStartEvent) => {
    if (!active || active.data.current?.type !== 'card') return

    setActiveCard(active.data.current?.card)
  }

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over || active.id === over.id) return

    const isActiveACard = active.data.current?.type === 'card'
    const isDraggingOverACard = over.data.current?.type === 'card'
    const isDraggingOverAColumn = over.data.current?.type === 'column'

    if (!isActiveACard) return

    if (isActiveACard && isDraggingOverACard) {
      setCards(prevCards => {
        if (!prevCards) return prevCards

        const activeCardIndex = findIndexById(prevCards, active.id as string)
        const overCardIndex = findIndexById(prevCards, over.id as string)

        const activeCard = prevCards[activeCardIndex]
        const overCard = prevCards[overCardIndex]

        if (
          activeCard &&
          overCard &&
          activeCard.columnId !== overCard.columnId
        ) {
          activeCard.columnId = overCard.columnId

          return arrayMove(
            prevCards,
            activeCardIndex,
            Math.max(0, overCardIndex - 1)
          )
        }

        return arrayMove(prevCards, activeCardIndex, overCardIndex)
      })
    }

    if (isActiveACard && isDraggingOverAColumn) {
      setCards(prevCards => {
        if (!prevCards) return prevCards

        const activeCardIndex = findIndexById(prevCards, active.id as string)
        const activeCard = prevCards[activeCardIndex]

        if (activeCard) {
          activeCard.columnId = over.id as string

          return arrayMove(prevCards, activeCardIndex, activeCardIndex)
        }

        return prevCards
      })
    }
  }

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!active || active.data.current?.type !== 'card') return

    setActiveCard(null)

    if (!cards || !over) return

    const overCard = cards.find(c => c.id === over.id)

    if (overCard) {
      updateCardOrder({
        columnId: overCard.columnId,
        ids: cards.filter(c => c.columnId === overCard.columnId).map(c => c.id)
      })
    }
  }

  return { onDragStart, onDragOver, onDragEnd }
}
