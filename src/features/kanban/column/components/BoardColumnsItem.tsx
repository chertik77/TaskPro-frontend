import type { AddCardModalProps, Card } from 'features/kanban/card/card.types'
import type { Column } from '../column.types'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useModal } from 'react-modal-state'

import { BoardCard } from 'features/kanban/card/components'
import { AddCardModal } from 'features/kanban/card/components/modals'
// import { useCardFilters } from 'features/kanban/card/hooks'
import { useDragAndDrop, useKanbanSortable } from 'features/kanban/dnd/hooks'

import { Button, Scrollbar } from 'components/ui'
import { useTabletAndBelowMediaQuery } from 'hooks'

import { cn } from 'lib'

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
  const { open: openAddCardModal } = useModal(AddCardModal)

  // const { cardPriority, cardDeadline } = useCardFilters()

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  const { cardsIds } = useDragAndDrop()

  // const filteredCards = getFilteredCards(cards!)

  const { style, setNodeRef, attributes, listeners, isDragging } =
    useKanbanSortable({
      id: column.id,
      data: { type: 'column', column }
    })

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
            {cards?.map(card => (
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
        onClick={() =>
          openAddCardModal<AddCardModalProps>({ columnId: column.id })
        }>
        Add another card
      </Button>
    </div>
  )
}
