import { Root } from '@radix-ui/react-radio-group'

import { RadioInput } from 'features/kanban/shared/components'
import { DEADLINES } from 'features/kanban/shared/constants'

export const DeadlineFilter = () => (
  // const { setSearchParams, cardDeadline } = useCardFilters()

  // const handleParamsChange = (v: string) => {
  //   setSearchParams(searchParams => {
  //     searchParams.set('deadline', v)

  //     return searchParams
  //   })
  // }

  <Root className='flex flex-col gap-2'>
    {DEADLINES.map(deadline => (
      <label
        className='flex items-center gap-2 text-sm text-black/50 has-[:checked]:text-black
          hocus:text-black dark:text-white/50 has-[:checked]:dark:text-white
          hocus:dark:text-white'
        key={deadline}>
        <RadioInput
          value={deadline}
          // checked={deadline === cardDeadline}
        />
        {deadline}
      </label>
    ))}
  </Root>
)
