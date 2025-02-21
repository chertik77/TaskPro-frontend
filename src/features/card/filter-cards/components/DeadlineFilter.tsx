import { Root } from '@radix-ui/react-radio-group'

import { DEADLINES, RadioInput } from '@/entities/card'

import { useCardFilters } from '../hooks/useCardFilters'

export const DeadlineFilter = () => {
  const { deadlineParam, handleParamsChange } = useCardFilters()

  return (
    <Root
      className='flex flex-col gap-2'
      value={deadlineParam ?? ''}
      onValueChange={v => handleParamsChange('deadline', v)}>
      {DEADLINES.map(deadline => (
        <label
          className='flex items-center gap-2 text-md text-black/50 has-[:checked]:text-black
            hocus:text-black dark:text-white/50 has-[:checked]:dark:text-white
            hocus:dark:text-white'
          key={deadline}>
          <RadioInput value={deadline} />
          {deadline}
        </label>
      ))}
    </Root>
  )
}
