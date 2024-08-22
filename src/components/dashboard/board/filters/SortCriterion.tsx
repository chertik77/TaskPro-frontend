import { Root } from '@radix-ui/react-radio-group'

import { RadioInput } from 'components/ui'

import { useCardFiltersBySearchParams } from 'hooks/card'

import sortItems from 'lib/json/sort-filter.json'

export const SortCriterion = () => {
  const { setSearchParams, cardSortCriterion } = useCardFiltersBySearchParams()

  return (
    <Root
      className='flex flex-col gap-2'
      value={cardSortCriterion}
      onValueChange={v => setSearchParams({ sort: v })}>
      {sortItems.map(({ value, id }) => (
        <label
          key={id}
          className='flex items-center gap-2 text-sm text-black/50 has-[:checked]:text-black
            hocus:text-black dark:text-white/50 has-[:checked]:dark:text-white
            hocus:dark:text-white'>
          <RadioInput
            value={id}
            checked={id === cardSortCriterion}
          />
          {value}
        </label>
      ))}
    </Root>
  )
}
