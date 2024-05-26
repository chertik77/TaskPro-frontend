import { Root } from '@radix-ui/react-radio-group'
import { useDispatch, useSelector } from 'react-redux'

import { RadioInput } from 'components/ui'

import { filterCards, selectPriorityFilter } from 'redux/filter.slice'

import { priorities } from 'constants/priorities'

export const PriorityFilter = () => {
  const priorityFilter = useSelector(selectPriorityFilter)

  const dispatch = useDispatch()

  return (
    <Root
      className='flex flex-col gap-2'
      value={priorityFilter}
      onValueChange={v => dispatch(filterCards(v))}>
      {priorities.map(priority => (
        <label
          className='flex items-center gap-2 text-fs-12-lh-normal-fw-400 text-black/50
            has-[:checked]:text-black hocus:text-black dark:text-white/50
            has-[:checked]:dark:text-white hocus:dark:text-white'
          key={priority}>
          <RadioInput
            value={priority}
            checked={priority === priorityFilter}
          />
          {priority}
        </label>
      ))}
    </Root>
  )
}
