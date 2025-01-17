import type { CardTypes } from 'shared/api/card'

import { cn } from 'shared/lib'

import { getPriorityColor } from '../utils'

type BoardCardPriorityProps = {
  priority: CardTypes.Priority
}

export const BoardCardPriority = ({ priority }: BoardCardPriorityProps) => (
  <div className='mr-3.5'>
    <p className='mb-1 text-extrasm text-black/50 dark:text-white/50'>
      Priority
    </p>
    <div className='flex items-center gap-1'>
      <div className={cn('size-3 rounded-full', getPriorityColor(priority))} />
      <p className='text-xs'>{priority}</p>
    </div>
  </div>
)
