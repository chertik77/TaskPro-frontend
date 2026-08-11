import { TASK_DEADLINES } from '@/entities/task'

import { useTaskFilters } from '../lib/useTaskFilters'
import { FilterOption } from './FilterOption'

export const DeadlineFilter = () => {
  const { deadline, toggleFilter } = useTaskFilters()

  return (
    <div className='flex flex-col gap-2'>
      {TASK_DEADLINES.map(value => (
        <FilterOption
          key={value}
          isChecked={deadline.includes(value)}
          onCheckedChange={() => toggleFilter('deadline', value)}>
          {value}
        </FilterOption>
      ))}
    </div>
  )
}
