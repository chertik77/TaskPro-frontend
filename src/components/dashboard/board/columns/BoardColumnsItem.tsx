import type { Card, Column } from 'types'

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useModal } from 'react-modal-state'

import { NewCardModal } from 'components/dashboard/modals'
import { Button, Scrollbar } from 'components/ui'

import { useTabletAndBelowMediaQuery } from 'hooks'
import { useCardFilters } from 'hooks/card'

import { cn } from 'lib'
import { getFilteredCards } from 'lib/filters'

import { BoardCard } from '../cards/BoardCard'
import { BoardColumnsActions } from './BoardColumnsActions'

type BoardColumnsItemProps = {
  column: Column
  cards: Card[] | undefined
  cardsIds: string[] | undefined
  backgroundIdentifier?: string
}

export const BoardColumnsItem = ({
  column,
  cards,
  cardsIds,
  backgroundIdentifier
}: BoardColumnsItemProps) => {
  const { open } = useModal(NewCardModal)

  const { cardPriority, cardDeadline } = useCardFilters()

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  const filteredCards = getFilteredCards(cards!, {
    priority: cardPriority,
    deadline: cardDeadline
  })

  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging
  } = useSortable({
    id: column.id,
    data: { type: 'column', column }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return isDragging ? (
    <div
      className='w-[334px] rounded-lg border-2 border-brand bg-white-gray-secondary opacity-60
        violet:border-brand-secondary dark:bg-black'
      ref={setNodeRef}
      style={style}
    />
  ) : (
    <div
      className={cn(
        `flex w-[334px] cursor-grab touch-manipulation flex-col
        focus-visible:outline-none`,
        isDragging && 'select-none'
      )}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}>
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
