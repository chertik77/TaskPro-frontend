import { format } from 'date-fns'

export const BoardCardDeadline = ({ deadline }: { deadline: Date }) => (
  <div>
    <p className='mb-1 text-extrasm text-black/50 dark:text-white/50'>
      Deadline
    </p>
    <p className='text-xs'>{format(deadline, 'dd/MM/yyyy')}</p>
  </div>
)
