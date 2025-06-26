import { CARD_PRIORITIES, getPriorityColor } from '@/entities/card'

import { cn } from '@/shared/lib'
import { RadioGroup, RadioGroupItem } from '@/shared/ui'

import { useCardFilters } from '../lib/useCardFilters'

export const PriorityFilter = () => {
  const { priorityParam, handleParamsChange } = useCardFilters()

  return (
    <RadioGroup
      className='flex-col'
      value={priorityParam ?? ''}
      onValueChange={v => handleParamsChange('priority', v)}>
      {CARD_PRIORITIES.map(priority => (
        <label
          className='text-md hocus:text-black hocus:dark:text-white flex cursor-pointer items-center
            gap-2 text-black/50 has-[[data-state=checked]]:text-black dark:text-white/50
            dark:has-[[data-state=checked]]:text-white'
          key={priority}>
          <RadioGroupItem
            className={getPriorityColor(priority)}
            indicatorClassname={cn(`after:${getPriorityColor(priority)}`)}
            value={priority}
          />
          {priority}
        </label>
      ))}
    </RadioGroup>
  )
}
