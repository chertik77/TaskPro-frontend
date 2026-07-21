import { TASK_DEADLINES } from '@/entities/task'

import { RadioGroup, RadioGroupItem } from '@/shared/ui'

import { useTaskFilters } from '../lib/useTaskFilters'

export const DeadlineFilter = () => {
  const { deadline, handleParamsChange } = useTaskFilters()

  return (
    <RadioGroup
      className='flex-col'
      value={deadline ?? ''}
      onValueChange={v => handleParamsChange('deadline', v)}>
      {TASK_DEADLINES.map(deadline => (
        <label
          className='text-md hocus:text-black dark:hocus:text-white
            pointer-cursors:cursor-pointer flex items-center gap-2 text-black/50
            has-data-checked:text-black dark:text-white/50
            dark:has-data-checked:text-white'
          key={deadline}>
          <RadioGroupItem
            className='bg-black/30 dark:bg-white/30'
            indicatorClassname='bg-black/30 dark:bg-white/30'
            value={deadline}
          />
          {deadline}
        </label>
      ))}
    </RadioGroup>
  )
}
