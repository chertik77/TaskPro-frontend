import { Root } from '@radix-ui/react-radio-group'

import { RadioInput } from '@/shared/components/ui'
import { PRIORITIES } from '@/shared/constants'

import { useCardFilters } from '../hooks'

export const PriorityFilter = () => {
  const { priorityParam, handleParamsChange } = useCardFilters()

  return (
    <Root
      className='flex flex-col gap-2'
      value={priorityParam}
      onValueChange={v => handleParamsChange('priority', v)}>
      {PRIORITIES.map(priority => (
        <label
          className='flex items-center gap-2 text-sm text-black/50 has-[:checked]:text-black
            hocus:text-black dark:text-white/50 has-[:checked]:dark:text-white
            hocus:dark:text-white'
          key={priority}>
          <RadioInput
            value={priority}
            checked={priority === priorityParam}
          />
          {priority}
        </label>
      ))}
    </Root>
  )
}
