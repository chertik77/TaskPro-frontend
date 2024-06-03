import { Root } from '@radix-ui/react-radio-group'
import { useDispatch, useSelector } from 'react-redux'

import { RadioInput } from 'components/ui'

import { selectCardSort, sortCards } from 'redux/filter.slice'

import sortItems from 'lib/json/sort-filter.json'

export const SortFilter = () => {
  const cardSort = useSelector(selectCardSort)

  const dispatch = useDispatch()

  return (
    <Root
      className='flex flex-col gap-2'
      value={cardSort}
      onValueChange={v => dispatch(sortCards(v))}>
      {sortItems.map(({ value, id }) => (
        <label
          key={id}
          className='flex items-center gap-2 text-sm text-black/50 has-[:checked]:text-black
            hocus:text-black dark:text-white/50 has-[:checked]:dark:text-white
            hocus:dark:text-white'>
          <RadioInput
            value={id}
            checked={id === cardSort}
          />
          {value}
        </label>
      ))}
    </Root>
  )
}
