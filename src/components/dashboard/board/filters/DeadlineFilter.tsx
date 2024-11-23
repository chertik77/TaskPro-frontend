import { Root } from '@radix-ui/react-radio-group'

import { RadioInput } from 'components/ui'

import { useCardFiltersBySearchParams } from 'hooks/card'

const deadlinesFilters = [
  { id: 'asc', value: 'Ascending Order' },
  { id: 'desc', value: 'Descending Order' }
]

export const DeadlineFilter = () => {
  const { setSearchParams, cardDeadline } = useCardFiltersBySearchParams()

  const handleDeadlineChange = (v: string) => {
    setSearchParams(prev => {
      prev.set('deadline', v)

      return prev
    })
  }

  return (
    <Root
      className='flex flex-col gap-2'
      value={cardDeadline}
      onValueChange={handleDeadlineChange}>
      {deadlinesFilters.map(({ value, id }) => (
        <label
          key={id}
          className='flex items-center gap-2 text-sm text-black/50 has-[:checked]:text-black
            hocus:text-black dark:text-white/50 has-[:checked]:dark:text-white
            hocus:dark:text-white'>
          <RadioInput
            value={id}
            checked={id === cardDeadline}
          />
          {value}
        </label>
      ))}
    </Root>
  )
}
