import type { Column } from 'types'

import * as ScrollArea from '@radix-ui/react-scroll-area'

import { Scrollbar } from 'components/ui'

import { useTabletAndBelowMediaQuery } from 'hooks'
import { useCardFiltersBySearchParams } from 'hooks/card'

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
  const { cardPriority, cardSortCriterion } = useCardFiltersBySearchParams()

  const filteredCards = getFilteredCardsByPriority(column.cards, cardPriority)

  const sortedCards = getSortedCards(filteredCards, cardSortCriterion)

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return (
    <>
      <BoardColumnsActions column={column} />
      <ScrollArea.Root
        type='scroll'
        className={cn('-mr-4 pr-4', {
          'h-[calc(100dvh-275px)]': !isTabletAndBelow,
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
        <Scrollbar
          backgroundIdentifier={backgroundIdentifier}
          scrollBarClassName='w-2'
          thumbClassName='!w-2'
        />
      </ScrollArea.Root>
    </>
  )
}
