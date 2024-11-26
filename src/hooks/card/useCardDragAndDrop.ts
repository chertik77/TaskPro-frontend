import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
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

    const activeId = active.id as string
    const overId = over.id as string

    if (!activeId || activeId === overId) return

    const isOverACard = over.data.current?.type === 'card'
    const isOverAColumn = over.data.current?.type === 'column'

    if (isOverACard) {
      setCards(cards => {
        if (!cards) return

        const activeCardIndex = cards.findIndex(card => card.id === activeId)
        const overCardIndex = cards.findIndex(card => card.id === overId)

        const activeCard = cards[activeCardIndex!]
        const overCard = cards[overCardIndex!]

        if (
          activeCard &&
          overCard &&
          activeCard.columnId !== overCard.columnId
        ) {
          activeCard.columnId = overCard.columnId

          return arrayMove(
            cards,
            activeCardIndex,
            Math.max(0, overCardIndex - 1)
          )
        }

        return arrayMove(cards, activeCardIndex, overCardIndex)
      })
    }

    if (isOverAColumn) {
      setCards(cards => {
        const activeCardIndex = cards?.findIndex(c => c.id === activeId)

        const activeCard = cards![activeCardIndex!]

        if (activeCard) {
          activeCard.columnId = overId as string

          return arrayMove(cards!, activeCardIndex!, activeCardIndex!)
        }

        return cards
      })
    }
  }

  const onDragEnd = ({ over }: DragEndEvent) => {
    if (!over || !cards) return

    const overCard = cards.find(c => c.id === over.id)

    if (overCard) {
      mutate({
        columnId: overCard.columnId,
        ids: cards.filter(c => c.columnId === overCard.columnId).map(c => c.id)
      })
    }
  }

  return { cards, activeCard, onDragStart, onDragOver, onDragEnd }
}
