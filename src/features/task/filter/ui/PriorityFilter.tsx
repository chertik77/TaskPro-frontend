import { getTaskPriorityColor } from '@/entities/task'

import { TaskPriority } from '@/shared/api'
import { capitalize } from '@/shared/lib'
import { RadioGroup, RadioGroupItem } from '@/shared/ui'

import { useTaskFilters } from '../lib/useTaskFilters'

export const PriorityFilter = () => {
  const { priority, handleParamsChange } = useTaskFilters()

  return (
    <RadioGroup
      className='flex-col'
      value={priority ?? ''}
      onValueChange={v => handleParamsChange('priority', v)}>
      {Object.values(TaskPriority).map(priority => (
        <label
          className='text-md hocus:text-black dark:hocus:text-white flex
            cursor-pointer items-center gap-2 text-black/50
            has-data-checked:text-black dark:text-white/50
            dark:has-data-checked:text-white'
          key={priority}>
          <RadioGroupItem
            className={getTaskPriorityColor(priority)}
            indicatorClassname={getTaskPriorityColor(priority)}
            value={priority}
          />
          {capitalize(priority)}
        </label>
      ))}
    </RadioGroup>
  )
}
