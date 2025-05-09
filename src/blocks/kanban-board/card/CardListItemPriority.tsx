import type { Priority } from '@/shared/constants'

import { getPriorityColor } from '@/entities/card'

import { cn } from '@/shared/lib/cn'

type CardListItemPriorityProps = {
  priority: Priority
}

export const CardListItemPriority = ({
  priority
}: CardListItemPriorityProps) => (
  <div className='mr-3.5'>
    <p className='mb-1 text-xs text-black/50 dark:text-white/50'>Priority</p>
    <div className='flex items-center gap-1'>
      <div className={cn('size-3 rounded-full', getPriorityColor(priority))} />
      <p className='text-sm'>{priority}</p>
    </div>
  </div>
)
