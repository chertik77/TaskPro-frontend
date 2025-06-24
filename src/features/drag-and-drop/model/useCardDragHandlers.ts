import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier
} from '@dnd-kit/core'
import type { CardDragHandlersProps } from './types'

import { useRef } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

import { useUpdateCardOrder } from '../api/useUpdateCardOrder'

export const useCardDragHandlers = ({
  cards,
  setCards,
  setActiveCard
}: CardDragHandlersProps) => {
  const { mutate: updateCardOrder } = useUpdateCardOrder()

  const recentlyDraggedOverId = useRef<UniqueIdentifier | null>(null)

  const onDragStart = ({ active }: DragStartEvent) => {
    if (!active || active.data.current?.type !== 'card') return

    setActiveCard(active.data.current.card)
  }

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over || active.id === over.id) return

    const isActiveACard = active.data.current?.type === 'card'
    const isDraggingOverACard = over.data.current?.type === 'card'
    const isDraggingOverAColumn = over.data.current?.type === 'column'

    if (!isActiveACard) return

    if (isActiveACard && isDraggingOverACard) {
      setTimeout(() => {
        setCards(prevCards => {
          const activeCardIndex = prevCards.findIndex(c => c.id === active.id)
          const overCardIndex = prevCards.findIndex(c => c.id === over.id)

          const activeCard = prevCards[activeCardIndex]
          const overCard = prevCards[overCardIndex]

          recentlyDraggedOverId.current = over.id

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
      }, 0)
    }

    if (isActiveACard && isDraggingOverAColumn) {
      setCards(prevCards => {
        const activeCardIndex = prevCards.findIndex(c => c.id === active.id)
        const activeCard = prevCards[activeCardIndex]

        recentlyDraggedOverId.current = over.id

        if (activeCard) {
          activeCard.columnId = over.id as string

          return arrayMove(prevCards, activeCardIndex, activeCardIndex)
        }

        return prevCards
      })
    }
  }

  const onDragEnd = ({ active }: DragEndEvent) => {
    setActiveCard(null)

    if (!active || active.data.current?.type !== 'card') return

    const activeCard = cards.find(c => c.id === active.id)

    if (activeCard && recentlyDraggedOverId.current) {
      updateCardOrder({
        columnId: activeCard.columnId,
        ids: cards
          .filter(c => c.columnId === activeCard.columnId)
          .map(c => c.id)
      })
    }
  }

  return { onDragStart, onDragOver, onDragEnd }
}
