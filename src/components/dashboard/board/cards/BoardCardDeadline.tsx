import type { Card } from 'types'

import { format } from 'date-fns'

type BoardCardDeadlineProps = {
  deadline: Card['deadline']
}

export const BoardCardDeadline = ({ deadline }: BoardCardDeadlineProps) => (
  <div>
    <p className='pb-1 text-fs-8-lh-normal-fw-400 text-black/50 dark:text-white/50'>
      Deadline
    </p>
    <p className='text-fs-10-lh-normal-fw-400'>
      {format(deadline, 'dd/MM/yyyy')}
    </p>
  </div>
)
