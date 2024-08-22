import { Root } from '@radix-ui/react-radio-group'

import { RadioInput } from 'components/ui'

import { useCardFiltersBySearchParams } from 'hooks/card'

import { priorities } from 'constants/priorities'

export const PriorityFilter = () => {
  const { setSearchParams, cardPriority } = useCardFiltersBySearchParams()

  return (
    <Root
      className='flex flex-col gap-2'
      value={cardPriority}
      onValueChange={v => setSearchParams({ priority: v })}>
      {priorities.map(priority => (
        <label
          className='flex items-center gap-2 text-sm text-black/50 has-[:checked]:text-black
            hocus:text-black dark:text-white/50 has-[:checked]:dark:text-white
            hocus:dark:text-white'
          key={priority}>
          <RadioInput
            value={priority}
            checked={priority === cardPriority}
          />
          {priority}
        </label>
      ))}
    </Root>
  )
}
