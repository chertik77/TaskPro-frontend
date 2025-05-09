import {
  getPriorityColor,
  PriorityRadioGroup,
  PriorityRadioGroupItem
} from '@/entities/card'

import { PRIORITIES } from '@/shared/constants'
import { cn } from '@/shared/lib/cn'

import { useCardFilters } from '../hooks/useCardFilters'

export const PriorityFilter = () => {
  const { priorityParam, handleParamsChange } = useCardFilters()

  return (
    <PriorityRadioGroup
      className='flex-col'
      value={priorityParam ?? ''}
      onValueChange={v => handleParamsChange('priority', v)}>
      {PRIORITIES.map(priority => (
        <label
          className='flex items-center gap-2 text-md text-black/50 has-[:checked]:text-black
            hocus:text-black dark:text-white/50 has-[:checked]:dark:text-white
            hocus:dark:text-white'
          key={priority}>
          <PriorityRadioGroupItem
            className={getPriorityColor(priority)}
            // eslint-disable-next-line tailwindcss/no-custom-classname
            indicatorClassname={cn(`after:${getPriorityColor(priority)}`)}
            value={priority}
          />
          {priority}
        </label>
      ))}
    </PriorityRadioGroup>
  )
}
