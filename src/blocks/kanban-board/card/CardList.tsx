import type { CardTypes } from '@/entities/card'

import { useDndMonitor } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { useCardDragHandlers } from '@/features/card'
import { useFilteredCards } from '@/features/card/filter-cards'

import { useDragAndDrop } from '@/entities/dnd'

import { CardListItem } from './CardListItem'

type CardListProps = {
  cards: CardTypes.Card[] | undefined
}

export const CardList = ({ cards }: CardListProps) => {
  const { cards: allCards } = useDragAndDrop()

  useDndMonitor(useCardDragHandlers())

  const filteredCards = useFilteredCards(cards!)

  return (
    <SortableContext
      items={allCards || []}
      strategy={verticalListSortingStrategy}>
      {filteredCards?.map(card => (
        <CardListItem
          card={card}
          key={card.id}
        />
      ))}
    </SortableContext>
  )
}
