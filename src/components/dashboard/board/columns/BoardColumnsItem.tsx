import type { Column } from 'types'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useModal } from 'react-modal-state'

import { AddCardModal } from 'components/dashboard/modals'
import { Button, Scrollbar } from 'components/ui'

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

  const [parent] = useAutoAnimate({ duration: 400 })

  const { open } = useModal(AddCardModal)

  const filteredCards = getFilteredCardsByPriority(column.cards, cardPriority)

  const sortedCards = getSortedCards(filteredCards, cardSortCriterion)

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return (
    <div className='flex w-[334px] flex-col'>
      <BoardColumnsActions column={column} />
      <ScrollArea.Root
        type='scroll'
        className={cn('-mr-4 pr-4', {
          'h-[calc(100dvh-275px)]': !isTabletAndBelow,
          'h-[calc(100dvh-300px)]': isTabletAndBelow
        })}>
        <ScrollArea.Viewport className='h-full'>
          <div ref={parent}>
            {sortedCards?.map(card => (
              <BoardCard
                card={card}
                key={card.id}
              />
            ))}
          </div>
        </ScrollArea.Viewport>
        <Scrollbar
          backgroundIdentifier={backgroundIdentifier}
          scrollBarClassName='w-2'
          thumbClassName='!w-2'
        />
      </ScrollArea.Root>
      <Button
        isPlusIcon
        className='mt-3.5'
        onClick={() => open(column.id)}>
        Add another card
      </Button>
    </div>
  )
}
