import type { CardTypes } from '@/shared/api/card'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { useDragAndDrop } from '../../dnd/hooks'
import { useCardFilters } from '../hooks'
import { getFilteredCards } from '../utils'
import { BoardCard } from './BoardCard'

type BoardCardListProps = {
  cards: CardTypes.Card[] | undefined
}

export const BoardCardList = ({ cards }: BoardCardListProps) => {
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
        <BoardCard
          card={card}
          key={card.id}
        />
      ))}
    </SortableContext>
  )
}
