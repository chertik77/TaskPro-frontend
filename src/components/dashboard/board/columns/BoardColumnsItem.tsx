import type { Column } from 'types'

import { useSelector } from 'react-redux'

import { useTabletAndBelowMediaQuery } from 'hooks'

import { selectCardPriority, selectCardSortCriterion } from 'redux/filter.slice'

import { cn, getFilteredCardsByPriority, getSortedCards } from 'lib'

import { BoardCard } from '../cards/BoardCard'
import { BoardColumnsActions } from './BoardColumnsActions'

type BoardColumnsItemProps = {
  column: Column
  backgroundIdentifier?: string
}

export const BoardColumnsItem = ({
  column
  // backgroundIdentifier
}: BoardColumnsItemProps) => {
  const cardPriority = useSelector(selectCardPriority)
  const cardSortCriterion = useSelector(selectCardSortCriterion)

  const filteredCards = getFilteredCardsByPriority(column.cards, cardPriority)

  const sortedCards = getSortedCards(filteredCards, cardSortCriterion)

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return (
    <>
      <BoardColumnsActions column={column} />
      <div
        // type='scroll'
        className={cn('-mr-4 overflow-y-scroll pr-4', {
          'h-[calc(100dvh-275px)]': !isTabletAndBelow,
          'h-[calc(100dvh-300px)]': isTabletAndBelow
        })}>
        <div className='h-full'>
          {sortedCards?.map(card => (
            <BoardCard
              card={card}
              key={card.id}
            />
          ))}
        </div>
        {/* <Scrollbar
          backgroundIdentifier={backgroundIdentifier}
          scrollBarClassName='w-2'
          thumbClassName='!w-2'
        /> */}
      </div>
    </>
  )
}
