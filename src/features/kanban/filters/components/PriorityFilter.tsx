import { Root } from '@radix-ui/react-radio-group'

import { RadioInput } from 'features/kanban/shared/components'
import { PRIORITIES } from 'features/kanban/shared/constants'

export const PriorityFilter = () => (
  // const { setSearchParams, cardPriority } = useCardFilters()

  // const handleParamsChange = (v: string) => {
  //   setSearchParams(searchParams => {
  //     searchParams.set('priority', v)

  //     return searchParams
  //   })
  // }

  <Root className='flex flex-col gap-2'>
    {PRIORITIES.map(priority => (
      <label
        className='flex items-center gap-2 text-sm text-black/50 has-[:checked]:text-black
          hocus:text-black dark:text-white/50 has-[:checked]:dark:text-white
          hocus:dark:text-white'
        key={priority}>
        <RadioInput
          value={priority}
          // checked={priority === cardPriority}
        />
        {priority}
      </label>
    ))}
  </Root>
)
