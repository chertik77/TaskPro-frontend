import type { Card } from 'types'

import { format } from 'date-fns'

type BoardCardDeadlineProps = {
  deadline: Card['deadline']
}

export const BoardCardDeadline = ({ deadline }: BoardCardDeadlineProps) => (
  <div>
    <p className='mb-1 text-extrasm text-black/50 dark:text-white/50'>
      Deadline
    </p>
    <p className='text-xs'>{format(deadline, 'dd/MM/yyyy')}</p>
  </div>
)
