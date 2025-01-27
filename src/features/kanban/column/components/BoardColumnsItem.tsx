import type { CardTypes } from '@/shared/api/card'
import type { ColumnTypes } from '@/shared/api/column'

import {
  BoardAddCardBtn,
  BoardCardList
} from '@/features/kanban/card/components'
import { useKanbanSortable } from '@/features/kanban/dnd/hooks'
import { Scrollbar } from '@/shared/components/ui'
import { useTabletAndBelowMediaQuery } from '@/shared/hooks'
import { cn } from '@/shared/lib'
import * as ScrollArea from '@radix-ui/react-scroll-area'

import { BoardColumnsActions } from './BoardColumnsActions'

type BoardColumnsItemProps = {
  column: ColumnTypes.Column
  cards: CardTypes.Card[] | undefined
  backgroundIdentifier?: string
}

export const BoardColumnsItem = ({
  column,
  cards,
  backgroundIdentifier
}: BoardColumnsItemProps) => {
  const isTabletAndBelow = useTabletAndBelowMediaQuery()

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
          <BoardCardList cards={cards} />
        </ScrollArea.Viewport>
        <Scrollbar
          backgroundIdentifier={backgroundIdentifier}
          scrollBarClassName='w-2'
          thumbClassName='!w-2'
        />
      </ScrollArea.Root>
      <BoardAddCardBtn columnId={column.id} />
    </div>
  )
}
