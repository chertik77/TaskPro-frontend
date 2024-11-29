import { Root } from '@radix-ui/react-radio-group'

import { RadioInput } from 'components/ui'

import { useCardFilters } from 'hooks/card'

import { deadlines } from 'constants/deadlines'

export const DeadlineFilter = () => {
  const { setSearchParams, cardDeadline } = useCardFilters()

  const handleParamsChange = (v: string) => {
    setSearchParams(searchParams => {
      searchParams.set('deadline', v)

      return searchParams
    })
  }

  return (
    <Root
      className='flex flex-col gap-2'
      value={cardDeadline}
      onValueChange={handleParamsChange}>
      {deadlines.map(deadline => (
        <label
          className='flex items-center gap-2 text-sm text-black/50 has-[:checked]:text-black
            hocus:text-black dark:text-white/50 has-[:checked]:dark:text-white
            hocus:dark:text-white'
          key={deadline}>
          <RadioInput
            value={deadline}
            checked={deadline === cardDeadline}
          />
          {deadline}
        </label>
      ))}
    </Root>
  )
}
