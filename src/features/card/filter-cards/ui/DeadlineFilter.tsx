import { CARD_DEADLINES } from '@/entities/card'

import { RadioGroup, RadioGroupItem } from '@/shared/ui'

import { useCardFilters } from '../lib/useCardFilters'

export const DeadlineFilter = () => {
  const { deadlineParam, handleParamsChange } = useCardFilters()

  return (
    <RadioGroup
      className='flex-col'
      value={deadlineParam ?? ''}
      onValueChange={v => handleParamsChange('deadline', v)}>
      {CARD_DEADLINES.map(deadline => (
        <label
          className='text-md hocus:text-black dark:hocus:text-white flex cursor-pointer items-center
            gap-2 text-black/50 has-[[data-state=checked]]:text-black dark:text-white/50
            dark:has-[[data-state=checked]]:text-white'
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
