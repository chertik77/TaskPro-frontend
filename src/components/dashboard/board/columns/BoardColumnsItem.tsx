import type { Column } from 'types'

import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useSelector } from 'react-redux'

import { CustomScrollbar } from 'components/ui'

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
  column,
  backgroundIdentifier
}: BoardColumnsItemProps) => {
  const cardPriority = useSelector(selectCardPriority)
  const cardSortCriterion = useSelector(selectCardSortCriterion)

  const filteredCards = getFilteredCardsByPriority(column.cards, cardPriority)

  const sortedCards = getSortedCards(filteredCards, cardSortCriterion)

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  console.log(backgroundIdentifier)
  return (
    <>
      <BoardColumnsActions column={column} />
      <ScrollArea.Root
        type='scroll'
        className={cn('-mr-4 overflow-hidden pr-4', {
          'h-[calc(100dvh-280px)]': !isTabletAndBelow,
          'h-[calc(100dvh-300px)]': isTabletAndBelow
        })}>
        <ScrollArea.Viewport className='h-full'>
          {sortedCards?.map(card => (
            <BoardCard
              card={card}
              key={card.id}
            />
          ))}
        </ScrollArea.Viewport>
        <CustomScrollbar
          backgroundIdentifier={backgroundIdentifier}
          scrollBarClassName='w-2'
          thumbClassName='!w-2'
        />
      </ScrollArea.Root>
    </>
  )
}
