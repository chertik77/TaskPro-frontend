import type { CardTypes } from '@/entities/card'

import { useMemo } from 'react'
import { SortableContext } from '@dnd-kit/sortable'

import { useFilteredCards } from '@/features/card/filter-cards'

import { CardListItem } from './CardListItem'

type CardListProps = {
  cards: CardTypes.CardsSchema | undefined
}

export const CardList = ({ cards }: CardListProps) => {
  const cardsIds = useMemo(() => cards?.map(c => c.id), [cards])

  const filteredCards = useFilteredCards(cards || [])

  return (
    <SortableContext items={cardsIds || []}>
      {filteredCards?.length > 0 && (
        <ul className='space-y-2'>
          {filteredCards.map(card => (
            <CardListItem
              key={card.id}
              card={card}
            />
          ))}
        </ul>
      )}
    </SortableContext>
  )
}
