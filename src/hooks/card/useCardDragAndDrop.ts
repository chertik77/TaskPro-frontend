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

    const updateCardColumn = (
      cards: Card[],
      activeId: string,
      newColumnId: string
    ) => {
      const activeCardIndex = cards.findIndex(c => c.id === activeId)

      if (activeCardIndex !== -1) {
        cards[activeCardIndex].columnId = newColumnId

        return arrayMove(cards, activeCardIndex, activeCardIndex)
      }

      return cards
    }

    const handleCardMove = (
      cards: Card[],
      activeId: string,
      overId: string
    ) => {
      const activeCardIndex = cards.findIndex(c => c.id === activeId)
      const overCardIndex = cards.findIndex(c => c.id === overId)

      if (activeCardIndex === -1 || overCardIndex === -1) return cards

      const activeCard = cards[activeCardIndex]
      const overCard = cards[overCardIndex]

      if (overCard && activeCard.columnId !== overCard.columnId) {
        activeCard.columnId = overCard.columnId

        return arrayMove(cards, activeCardIndex, Math.max(0, overCardIndex - 1))
      }

      return arrayMove(cards, activeCardIndex, overCardIndex)
    }

    setCards(cards => {
      if (!cards) return cards

      if (isOverACard) {
        return handleCardMove(cards, activeId, overId)
      }

      if (isOverAColumn) {
        return updateCardColumn(cards, activeId, overId)
      }
    })
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
