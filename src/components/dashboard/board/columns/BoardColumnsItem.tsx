import type { Card, Column } from 'types'

import { useMemo } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useModal } from 'react-modal-state'

import { AddCardModal } from 'components/dashboard/modals'
import { Button, Scrollbar } from 'components/ui'

import { useTabletAndBelowMediaQuery } from 'hooks'
import { useCardFilters } from 'hooks/card'

import { cn } from 'lib'
import { getFilteredCardsByPriority } from 'lib/filters'

import { BoardCard } from '../cards/BoardCard'
import { BoardColumnsActions } from './BoardColumnsActions'

type BoardColumnsItemProps = {
  column: Column
  cards: Card[] | undefined
  backgroundIdentifier?: string
}

export const BoardColumnsItem = ({
  column,
  cards,
  backgroundIdentifier
}: BoardColumnsItemProps) => {
  const { open } = useModal(AddCardModal)

  const { cardPriority } = useCardFilters()

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  const filteredCards = getFilteredCardsByPriority(cards!, cardPriority)

  const cardsIds = useMemo(() => filteredCards?.map(c => c.id), [filteredCards])

  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { type: 'column' }
  })

  return (
    <div
      className='flex w-[334px] flex-col'
      ref={setNodeRef}>
      <BoardColumnsActions column={column} />
      <ScrollArea.Root
        type='scroll'
        className={cn('-mr-4 pr-4', {
          'h-[calc(100dvh-275px)]': !isTabletAndBelow,
          'h-[calc(100dvh-300px)]': isTabletAndBelow
        })}>
        <ScrollArea.Viewport className='h-full'>
          <SortableContext
            items={cardsIds || []}
            strategy={verticalListSortingStrategy}>
            {filteredCards?.map(card => (
              <BoardCard
                card={card}
                key={card.id}
              />
            ))}
          </SortableContext>
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
