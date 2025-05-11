import { useMemo } from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { useFilteredCards } from '@/features/card/filter-cards'
import { useDragAndDrop } from '@/features/drag-and-drop'

import { CardListItem } from './CardListItem'

type CardListProps = {
  currentColumnId: string
}

export const CardList = ({ currentColumnId }: CardListProps) => {
  const { cards } = useDragAndDrop()

  const cardsIds = useMemo(() => cards?.map(c => c.id), [cards])

  const filteredCards = useFilteredCards(
    cards?.filter(c => c.columnId === currentColumnId) || []
  )

  return (
    <SortableContext
      items={cardsIds || []}
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
}
