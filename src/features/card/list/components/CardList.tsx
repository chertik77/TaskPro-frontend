import type { CardTypes } from '@/shared/api/card'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { useCardFilters } from '@/features/card/filters/hooks'
import { getFilteredCards } from '@/features/card/filters/utils'

import { useDragAndDrop } from '@/shared/store'

import { CardListItem } from './CardListItem'

type CardListProps = {
  cards: CardTypes.Card[] | undefined
}

export const CardList = ({ cards }: CardListProps) => {
  const { cards: allCards } = useDragAndDrop()

  const { priorityParam, deadlineParam } = useCardFilters()

  const filteredCards = getFilteredCards(cards!, {
    priority: priorityParam,
    deadline: deadlineParam
  })

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
