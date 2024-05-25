import * as Popover from '@radix-ui/react-popover'
import { Root } from '@radix-ui/react-radio-group'
import { useDispatch, useSelector } from 'react-redux'

import { RadioInput } from 'components/ui'

import { filterCards, selectFilter } from 'redux/filter.slice'

import { priorities } from 'constants/priorities'

export const FilterSelect = () => {
  const filterSelector = useSelector(selectFilter)

  const dispatch = useDispatch()

  return (
    <Popover.Root>
      <Popover.Trigger className='flex items-center gap-2'>
        <svg className='size-4 stroke-black/80 dark:stroke-white/80'>
          <use href='/icons.svg#icon-filter' />
        </svg>
        <h2>Filters</h2>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className='animation w-[300px] rounded-lg bg-white-primary p-6 dark:bg-black-fourth'
          collisionPadding={10}>
          <div className='border-b border-black/10 dark:border-white/10'>
            <h2 className='pb-default text-fs-18-lh-normal-fw-500'>Filters</h2>
          </div>
          <Popover.Close className='absolute right-default top-default focus:stroke-brand'>
            <svg className='size-[18px] stroke-black dark:stroke-white'>
              <use href='/icons.svg#icon-close' />
            </svg>
          </Popover.Close>
          <div className='my-default flex justify-between'>
            <h3>Label color</h3>
            <button
              type='button'
              onClick={() => dispatch(filterCards(''))}
              className='text-fs-12-lh-normal-fw-400 underline opacity-50 focus:outline-none
                hocus:text-brand-hover hocus:no-underline hocus:opacity-100'>
              Show all
            </button>
          </div>
          <Root
            className='flex flex-col gap-2'
            onValueChange={v => dispatch(filterCards(v))}>
            {priorities.map(priority => (
              <label
                className='flex items-center gap-2 text-fs-12-lh-normal-fw-400 text-black/50
                  has-[:checked]:text-black hocus:text-black dark:text-white/50
                  has-[:checked]:dark:text-white hocus:dark:text-white'
                key={priority}>
                <RadioInput
                  value={priority}
                  checked={priority === filterSelector}
                />
                {priority}
              </label>
            ))}
          </Root>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
