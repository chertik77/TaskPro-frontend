import type { CardTypes } from '@/shared/api/card'

import { useKanbanSortable } from '@/features/kanban/dnd/hooks'

import { cn } from '@/shared/lib'

import { getPriorityColor } from '../utils'
import { BoardCardActions } from './BoardCardActions'
import { BoardCardDeadline } from './BoardCardDeadline'
import { BoardCardPriority } from './BoardCardPriority'

export const BoardCard = ({ card }: { card: CardTypes.Card }) => {
  const { style, setNodeRef, attributes, listeners, isDragging } =
    useKanbanSortable({
      id: card.id,
      data: { type: 'card', card }
    })

  return isDragging ? (
    <div
      className='mb-2 h-5xl rounded-lg border-2 border-brand bg-white py-3.5 pl-6 pr-5 opacity-60
        last:mb-0 violet:border-brand-secondary dark:bg-black'
      ref={setNodeRef}
      style={style}
    />
  ) : (
    <div
      className={cn(
        `relative mb-2 h-5xl cursor-grab touch-manipulation overflow-hidden rounded-lg
        bg-white py-3.5 pl-6 pr-5 last:mb-0 focus-visible:outline-none dark:bg-black`,
        isDragging && 'select-none'
      )}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      style={style}>
      <div
        className={cn(
          'absolute left-0 top-0 h-full w-1 rounded-l',
          getPriorityColor(card.priority)
        )}
      />
      <p className='mb-2 text-base font-semibold'>{card.title}</p>
      <p className='mb-3.5 line-clamp-2 text-sm text-black/70 dark:text-white/50'>
        {card.description}
      </p>
      {/* eslint-disable-next-line tailwindcss/no-unnecessary-arbitrary-value */}
      <div className='flex items-end border-t-[1px] border-black/10 pt-3.5 dark:border-white/10'>
        <BoardCardPriority priority={card.priority} />
        <BoardCardDeadline deadline={card.deadline} />
        <BoardCardActions card={card} />
      </div>
    </div>
  )
}
