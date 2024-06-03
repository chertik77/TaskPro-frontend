import * as Popover from '@radix-ui/react-popover'
import { useDispatch } from 'react-redux'

import { filterCards, sortCards } from 'redux/filter.slice'

import { FilterControls } from './FilterControls'
import { PriorityFilter } from './PriorityFilter'
import { SortFilter } from './SortFilter'

export const Filters = () => {
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
          className='animation w-[300px] rounded-lg bg-white-primary p-6 shadow-select
            dark:bg-black-fourth'
          collisionPadding={10}>
          <h2 className='border-b border-black/10 pb-3.5 text-lg dark:border-white/10'>
            Filters
          </h2>
          <Popover.Close className='absolute right-3.5 top-3.5 focus:stroke-brand'>
            <svg className='size-lg stroke-black dark:stroke-white'>
              <use href='/icons.svg#icon-close' />
            </svg>
          </Popover.Close>
          <FilterControls
            controlTitle='Label color'
            buttonTitle='Show all'
            onClick={() => dispatch(filterCards(''))}
          />
          <PriorityFilter />
          <FilterControls
            controlTitle='Sort by'
            buttonTitle='Reset'
            onClick={() => dispatch(sortCards(''))}
          />
          <SortFilter />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
