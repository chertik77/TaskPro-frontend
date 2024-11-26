import type { DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import type { Card, Column } from 'types'

import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

import { useUpdateCardsOrder } from './useUpdateCardsOrder'

export const useCardDragAndDrop = (columns: Column[] | undefined) => {
  const [cards, setCards] = useState(columns?.flatMap(c => c.cards))

  const [activeCard, setActiveCard] = useState<Card | null>(null)

  const { mutate } = useUpdateCardsOrder()

  useEffect(() => {
    setCards(columns?.flatMap(c => c.cards))
  }, [columns])

  const onDragStart = ({ active }: DragStartEvent) => {
    setActiveCard(active.data.current?.card)
  }

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (!activeId || activeId === overId) return

    const isOverACard = over.data.current?.type === 'card'

    if (isOverACard) {
      setCards(cards => {
        const activeCardIndex = cards?.findIndex(card => card.id === activeId)
        const overCardIndex = cards?.findIndex(card => card.id === overId)

        const activeCard = cards![activeCardIndex!]
        const overCard = cards![overCardIndex!]

        if (
          activeCard &&
          overCard &&
          activeCard.columnId !== overCard.columnId
        ) {
          activeCard.columnId = overCard.columnId

          const updatedCards = arrayMove(
            cards!,
            activeCardIndex!,
            Math.max(0, overCardIndex! - 1)
          )

          // mutate({
          //   columnId: overCard.columnId,
          //   ids: updatedCards
          //     .filter(card => card.columnId === overCard.columnId)
          //     .map(card => card.id)
          // })

          return updatedCards
        }

        return arrayMove(cards!, activeCardIndex!, overCardIndex!)
      })
    }

    const isOverAColumn = over.data.current?.type === 'column'

    if (isOverAColumn) {
      const activeCardIndex = cards?.findIndex(card => card.id === activeId)

      cards![activeCardIndex!].columnId = overId as string

      const updatedCards = arrayMove(cards!, activeCardIndex!, activeCardIndex!)

      setCards(updatedCards)

      mutate({
        columnId: overId as string,
        ids: updatedCards
          .filter(card => card.columnId === overId)
          .map(card => card.id)
      })
    }
  }

  return { cards, activeCard, onDragStart, onDragOver }
}
