import type { DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import type { Card, Column } from 'types'

import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

export const useCardDragAndDrop = (columns: Column[] | undefined) => {
  const [cards, setCards] = useState(columns?.flatMap(c => c.cards))

  const [activeCard, setActiveCard] = useState<Card | null>(null)

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
      const activeCardIndex = cards?.findIndex(card => card.id === activeId)
      const overCardIndex = cards?.findIndex(card => card.id === overId)

      cards![activeCardIndex!].columnId = cards![overCardIndex!].columnId

      const updatedCards = arrayMove(cards!, activeCardIndex!, overCardIndex!)

      setCards(updatedCards)
    }

    const isOverAColumn = over.data.current?.type === 'column'

    if (isOverAColumn) {
      const activeCardIndex = cards?.findIndex(card => card.id === activeId)

      cards![activeCardIndex!].columnId = overId as string

      const updatedCards = arrayMove(cards!, activeCardIndex!, activeCardIndex!)

      setCards(updatedCards)
    }
  }

  return { cards, activeCard, onDragStart, onDragOver }
}
