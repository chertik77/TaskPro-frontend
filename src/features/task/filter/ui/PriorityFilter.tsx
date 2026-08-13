import { getTaskPriorityColor } from '@/entities/task'

import { TaskPriority } from '@/shared/api'
import { capitalize, cn } from '@/shared/lib'

import { useTaskFilters } from '../lib/useTaskFilters'
import { FilterOption } from './FilterOption'

export const PriorityFilter = () => {
  const { priority, toggleFilter } = useTaskFilters()

  return (
    <div className='flex flex-col gap-2'>
      {Object.values(TaskPriority).map(value => (
        <FilterOption
          key={value}
          isChecked={priority.includes(value)}
          onCheckedChange={() => toggleFilter('priority', value)}>
          <span
            className={cn('size-2.5 rounded-full', getTaskPriorityColor(value))}
          />
          {capitalize(value)}
        </FilterOption>
      ))}
    </div>
  )
}
