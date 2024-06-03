import type { Card } from 'types'

import { EnumPriority } from 'constants/priorities'

import { cn } from 'lib'

import { BoardCardActions } from './BoardCardActions'
import { BoardCardDeadline } from './BoardCardDeadline'
import { BoardCardPriority } from './BoardCardPriority'

export const BoardCard = ({ card }: { card: Card }) => (
  <div
    className={cn(
      'h-5xl w-8xl rounded-lg border-l-4 bg-white py-3.5 pl-6 pr-5 dark:bg-black',
      card.priority === EnumPriority.WithoutPriority &&
        'border-black/30 dark:border-white/30',
      card.priority === EnumPriority.High && 'border-brand',
      card.priority === EnumPriority.Medium && 'border-priority-medium',
      card.priority === EnumPriority.Low && 'border-priority-low'
    )}>
    <p className='mb-2 text-fs-14-lh-normal-fw-600'>{card.title}</p>
    <p className='mb-3.5 line-clamp-2 text-fs-12-lh-normal-fw-400 text-black/70 dark:text-white/50'>
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
