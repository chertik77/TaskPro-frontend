import type { Card } from 'types'

import { cn, getPriorityColor } from 'lib'

import { BoardCardActions } from './BoardCardActions'
import { BoardCardDeadline } from './BoardCardDeadline'
import { BoardCardPriority } from './BoardCardPriority'

export const BoardCard = ({ card }: { card: Card }) => (
  <div className='relative h-5xl w-8xl rounded-lg bg-white py-3.5 pl-6 pr-5 dark:bg-black'>
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
