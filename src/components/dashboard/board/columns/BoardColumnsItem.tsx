import type { Column } from 'types'

import { Draggable } from '@hello-pangea/dnd'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useModal } from 'react-modal-state'

import { AddCardModal } from 'components/dashboard/modals'
import { Button, Scrollbar } from 'components/ui'

import { useTabletAndBelowMediaQuery } from 'hooks'

import { cn } from 'lib'

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
          {column.cards?.map((card, index) => (
            <Draggable
              draggableId={card.id}
              key={card.id}
              index={index}>
              {({ innerRef, draggableProps, dragHandleProps }) => (
                <div
                  ref={innerRef}
                  className='mb-2 last:mb-0'
                  {...draggableProps}
                  {...dragHandleProps}>
                  <BoardCard card={card} />
                </div>
              )}
            </Draggable>
          ))}
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
