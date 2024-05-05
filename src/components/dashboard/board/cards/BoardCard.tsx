import type { Card } from 'types'

import { RadioPriority } from 'constants/priorities'

import { cn } from 'lib'

import { BoardCardActions } from './BoardCardActions'
import { BoardCardDeadline } from './BoardCardDeadline'
import { BoardCardPriority } from './BoardCardPriority'

export const BoardCard = ({ card }: { card: Card }) => (
  <div
    className={cn(
      `h-[154px] w-[335px] rounded-lg border-l-4 bg-white py-default pl-6 pr-5
      dark:bg-black`,
      card.priority === RadioPriority.WithoutPriority &&
        'border-black/30 dark:border-white/30',
      card.priority === RadioPriority.High && 'border-brand',
      card.priority === RadioPriority.Medium && 'border-priority-medium',
      card.priority === RadioPriority.Low && 'border-priority-low'
    )}>
    <p className='mb-2 text-fs-14-lh-normal-fw-600'>{card.title}</p>
    <p
      className='mb-default line-clamp-2 text-fs-12-lh-normal-fw-400 text-black/70
        dark:text-white/50'>
      {card.description}
    </p>
    <div className='flex items-end border-t-2 border-black/10 pt-default dark:border-white/10'>
      <BoardCardPriority priority={card.priority} />
      <BoardCardDeadline deadline={card.deadline} />
      <BoardCardActions card={card} />
    </div>
  </div>
)
