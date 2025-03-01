import { Indicator, Item, Root } from '@radix-ui/react-radio-group'

import { DEADLINES } from '@/entities/card'

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
          <Item
            className='focus-visible:styled-outline size-3.5 rounded-full bg-black/30 dark:bg-white/30'
            value={deadline}>
            <Indicator
              className='flex justify-center rounded-full after:size-3 after:rounded-full after:border-2
                after:border-white after:bg-black/30 after:dark:border-black
                dark:after:bg-white/30'
            />
          </Item>
          {deadline}
        </label>
      ))}
    </Root>
  )
}
