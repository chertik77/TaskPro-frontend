import type { Card } from 'types/board.types'

import { RadioPriority } from 'constants/priorities'

import { cn, getPriorityColor } from 'lib'

type BoardCardPriorityProps = {
  priority: Card['priority']
}

export const BoardCardPriority = ({ priority }: BoardCardPriorityProps) => (
  <div className='mr-default'>
    <p className='mb-1 text-fs-8-lh-normal-fw-400 text-black/50 dark:text-white/50'>
      Priority
    </p>
    <div className='flex items-center gap-1'>
      <div className={cn('size-3 rounded-full', getPriorityColor(priority))} />
      <p className='text-fs-10-lh-normal-fw-400'>
        {priority === RadioPriority.WithoutPriority ? 'Without' : priority}
      </p>
    </div>
  </div>
)
