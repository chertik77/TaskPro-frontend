import { DEADLINES } from '@/shared/constants'
import { RadioGroup, RadioGroupItem } from '@/shared/ui'

import { useCardFilters } from '../hooks/useCardFilters'

export const DeadlineFilter = () => {
  const { deadlineParam, handleParamsChange } = useCardFilters()

  return (
    <RadioGroup
      className='flex-col'
      value={deadlineParam ?? ''}
      onValueChange={v => handleParamsChange('deadline', v)}>
      {DEADLINES.map(deadline => (
        <label
          className='text-md hocus:text-black hocus:dark:text-white flex cursor-pointer items-center
            gap-2 text-black/50 has-[:checked]:text-black dark:text-white/50
            has-[:checked]:dark:text-white'
          key={deadline}>
          <RadioGroupItem
            className='bg-black/30 dark:bg-white/30'
            indicatorClassname='after:bg-black/30 dark:after:bg-white/30'
            value={deadline}
          />
          {deadline}
        </label>
      ))}
    </RadioGroup>
  )
}
