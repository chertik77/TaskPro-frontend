import type { Column } from 'types'

import { useSelector } from 'react-redux'

import { useTabletAndBelowMediaQuery } from 'hooks'

import { selectCardPriority, selectCardSortCriterion } from 'redux/filter.slice'

import { cn, getFilteredCardsByPriority, getSortedCards } from 'lib'

import { BoardCard } from '../cards/BoardCard'
import { BoardColumnsActions } from './BoardColumnsActions'

export const BoardColumnsItem = ({ column }: { column: Column }) => {
  const cardPriority = useSelector(selectCardPriority)
  const cardSortCriterion = useSelector(selectCardSortCriterion)

  const filteredCards = getFilteredCardsByPriority(column.cards, cardPriority)

  const sortedCards = getSortedCards(filteredCards, cardSortCriterion)

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return (
    <>
      <BoardColumnsActions
        column={column}
        sortedCardsLength={sortedCards?.length}
      />
      <div
        className={cn('custom-scrollbar -mr-4 space-y-2 overflow-y-auto pr-4', {
          'h-[calc(100dvh-270px)]': !cardPriority && !isTabletAndBelow,
          'h-[calc(100dvh-300px)]': !cardPriority && isTabletAndBelow
        })}>
        {sortedCards?.map(card => (
          <BoardCard
            card={card}
            key={card.id}
          />
        ))}
      </div>
    </>
  )
}
