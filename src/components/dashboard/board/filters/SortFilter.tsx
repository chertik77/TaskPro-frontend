import { Root } from '@radix-ui/react-radio-group'
import { useDispatch, useSelector } from 'react-redux'

import { RadioInput } from 'components/ui'

import { selectSortFilter, sortCards } from 'redux/filter.slice'

import sortItems from 'lib/json/sort-filter.json'

export const SortFilter = () => {
  const sortFilter = useSelector(selectSortFilter)

  const dispatch = useDispatch()

  return (
    <Root
      className='flex flex-col gap-2'
      value={sortFilter}
      onValueChange={v => dispatch(sortCards(v))}>
      {sortItems.map(({ value, id }) => (
        <label
          key={id}
          className='flex items-center gap-2 text-fs-12-lh-normal-fw-400 text-black/50
            has-[:checked]:text-black hocus:text-black dark:text-white/50
            has-[:checked]:dark:text-white hocus:dark:text-white'>
          <RadioInput
            value={id}
            checked={id === sortFilter}
          />
          {value}
        </label>
      ))}
    </Root>
  )
}
