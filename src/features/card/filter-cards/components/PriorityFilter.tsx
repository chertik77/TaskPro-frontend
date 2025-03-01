import { Indicator, Item, Root } from '@radix-ui/react-radio-group'

import { getPriorityColor, PRIORITIES } from '@/entities/card'

import { cn } from '@/shared/lib/cn'

import { useCardFilters } from '../hooks/useCardFilters'

export const PriorityFilter = () => {
  const { priorityParam, handleParamsChange } = useCardFilters()

  return (
    <Root
      className='flex flex-col gap-2'
      value={priorityParam ?? ''}
      onValueChange={v => handleParamsChange('priority', v)}>
      {PRIORITIES.map(priority => (
        <label
          className='flex items-center gap-2 text-md text-black/50 has-[:checked]:text-black
            hocus:text-black dark:text-white/50 has-[:checked]:dark:text-white
            hocus:dark:text-white'
          key={priority}>
          <Item
            className={cn(
              'focus-visible:styled-outline size-3.5 rounded-full',
              getPriorityColor(priority)
            )}
            value={priority}>
            <Indicator
              // eslint-disable-next-line tailwindcss/no-custom-classname
              className={cn(
                `flex justify-center rounded-full after:size-3 after:rounded-full after:border-2
                after:border-white after:dark:border-black`,
                `after:${getPriorityColor(priority)}`
              )}
            />
          </Item>
          {priority}
        </label>
      ))}
    </Root>
  )
}
