import { Root } from '@radix-ui/react-radio-group'

import { useCardFilters } from '@/features/kanban/card/hooks'
import { RadioInput } from '@/features/kanban/shared/components'

import { DEADLINES } from '@/shared/constants'

export const DeadlineFilter = () => {
  const { deadlineParam, handleParamsChange } = useCardFilters()

  return (
    <Root
      className='flex flex-col gap-2'
      value={deadlineParam}
      onValueChange={v => handleParamsChange('deadline', v)}>
      {DEADLINES.map(deadline => (
        <label
          className='flex items-center gap-2 text-sm text-black/50 has-[:checked]:text-black
            hocus:text-black dark:text-white/50 has-[:checked]:dark:text-white
            hocus:dark:text-white'
          key={deadline}>
          <RadioInput
            value={deadline}
            checked={deadline === deadlineParam}
          />
          {deadline}
        </label>
      ))}
    </Root>
  )
}
