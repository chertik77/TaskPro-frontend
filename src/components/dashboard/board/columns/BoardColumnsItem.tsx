import type { Column } from 'types'

import { Droppable } from '@hello-pangea/dnd'
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
  backgroundIdentifier?: string
}

export const BoardColumnsItem = ({
  column,
  backgroundIdentifier
}: BoardColumnsItemProps) => {
  const { open } = useModal(AddCardModal)

  const { cardPriority } = useCardFilters()

  // const [animationParent, enableAnimations] = useAutoAnimate({ duration: 400 })

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  const filteredCards = getFilteredCardsByPriority(column.cards, cardPriority)

  return (
    <div className='flex w-[334px] flex-col'>
      <BoardColumnsActions column={column} />
      <Droppable droppableId={column.id}>
        {({ innerRef, droppableProps, placeholder }) => (
          <ScrollArea.Root
            type='scroll'
            ref={innerRef}
            {...droppableProps}
            className={cn('-mr-4 pr-4', {
              'h-[calc(100dvh-275px)]': !isTabletAndBelow,
              'h-[calc(100dvh-300px)]': isTabletAndBelow
            })}>
            <ScrollArea.Viewport className='h-full'>
              {/* <div ref={animationParent}> */}
              {filteredCards.map((card, index) => (
                <BoardCard
                  card={card}
                  key={card.id}
                  index={index}
                />
              ))}
              {placeholder}
              {/* </div> */}
            </ScrollArea.Viewport>
            <Scrollbar
              backgroundIdentifier={backgroundIdentifier}
              scrollBarClassName='w-2'
              thumbClassName='!w-2'
            />
          </ScrollArea.Root>
        )}
      </Droppable>
      <Button
        isPlusIcon
        className='mt-3.5'
        onClick={() => open(column.id)}>
        Add another card
      </Button>
    </div>
  )
}
