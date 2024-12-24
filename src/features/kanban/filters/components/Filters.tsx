import * as Popover from '@radix-ui/react-popover'

import { useCardFilters } from 'features/kanban/card/hooks'

import { DeadlineFilter } from './DeadlineFilter'
import { PriorityFilter } from './PriorityFilter'

export const Filters = () => {
  const { searchParams, setSearchParams } = useCardFilters()

  return (
    <Popover.Root>
      <Popover.Trigger className='focus-visible:styled-outline mr-5 flex items-center gap-2 desktop:mr-6'>
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
          <Popover.Close className='focus-visible:styled-outline absolute right-3.5 top-3.5'>
            <svg className='size-lg stroke-black dark:stroke-white'>
              <use href='/icons.svg#icon-close' />
            </svg>
          </Popover.Close>
          <div className='my-3.5 flex justify-between'>
            <h3>Priority</h3>
            <button
              type='button'
              className='focus-visible:styled-outline text-sm underline opacity-50 hocus:text-brand-hover
                hocus:no-underline hocus:opacity-100 violet:hocus:text-brand-secondary'
              onClick={() => {
                searchParams.delete('priority')
                searchParams.delete('deadline')
                setSearchParams(searchParams)
              }}>
              Show all
            </button>
          </div>
          <PriorityFilter />
          <h3 className='my-3.5'>Deadline</h3>
          <DeadlineFilter />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
