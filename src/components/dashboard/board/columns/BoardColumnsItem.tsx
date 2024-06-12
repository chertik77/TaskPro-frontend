import type { Column } from 'types'

import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import { selectCardPriority, selectCardSortCriterion } from 'redux/filter.slice'

import { cn, getFilteredCardsByPriority, getSortedCards } from 'lib'

import { BoardCard } from '../cards/BoardCard'
import { BoardColumnsActions } from './BoardColumnsActions'

export const BoardColumnsItem = ({ column }: { column: Column }) => {
  const cardPriority = useSelector(selectCardPriority)
  const cardSortCriterion = useSelector(selectCardSortCriterion)

  const filteredCards = getFilteredCardsByPriority(column.cards, cardPriority)

  const sortedCards = getSortedCards(filteredCards, cardSortCriterion)

  const isTabletOrMobile = useMediaQuery({ minWidth: 320, maxWidth: 1439 })

  return (
    <>
      <BoardColumnsActions
        column={column}
        sortedCardsLength={sortedCards?.length}
      />
      <div
        className={cn('custom-scrollbar -mr-4 space-y-2 overflow-y-auto pr-4', {
          'h-[calc(100dvh-270px)]': !cardPriority && !isTabletOrMobile,
          'h-[calc(100dvh-300px)]': !cardPriority && isTabletOrMobile
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
