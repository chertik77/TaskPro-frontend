import type { CardTypes } from '@/entities/card'

import { memo } from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { useFilteredCards } from '@/features/card/filter-cards'

import { useDragAndDrop } from '@/entities/dnd'

import { CardListItem } from './CardListItem'

type CardListProps = {
  cards: CardTypes.Card[] | undefined
}

export const CardList = memo(({ cards }: CardListProps) => {
  const { cards: allCards } = useDragAndDrop()

  const filteredCards = useFilteredCards(cards!)

  return (
    <SortableContext
      items={allCards || []}
      strategy={verticalListSortingStrategy}>
      <ul className='space-y-2'>
        {filteredCards?.map(card => (
          <CardListItem
            key={card.id}
            card={card}
          />
        ))}
      </ul>
    </SortableContext>
  )
})
