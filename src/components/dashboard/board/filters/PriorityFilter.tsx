import { Root } from '@radix-ui/react-radio-group'
import { useDispatch, useSelector } from 'react-redux'

import { RadioInput } from 'components/ui'

import { filterCards, selectCardPriority } from 'redux/filter.slice'

import { priorities } from 'constants/priorities'

export const PriorityFilter = () => {
  const cardPriority = useSelector(selectCardPriority)

  const dispatch = useDispatch()

  return (
    <Root
      className='flex flex-col gap-2'
      value={cardPriority}
      onValueChange={v => dispatch(filterCards(v))}>
      {priorities.map(priority => (
        <label
          className='flex items-center gap-2 text-fs-12-lh-normal-fw-400 text-black/50
            has-[:checked]:text-black hocus:text-black dark:text-white/50
            has-[:checked]:dark:text-white hocus:dark:text-white'
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
