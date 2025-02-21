import { format } from 'date-fns'

export const CardListItemDeadline = ({ deadline }: { deadline: Date }) => (
  <div>
    <p className='mb-1 text-xs text-black/50 dark:text-white/50'>Deadline</p>
    <p className='text-sm'>{format(deadline, 'dd/MM/yyyy')}</p>
  </div>
)
