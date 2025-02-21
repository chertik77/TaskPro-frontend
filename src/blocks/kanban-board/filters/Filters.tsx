import * as Popover from '@radix-ui/react-popover'
import { Link } from '@tanstack/react-router'

import { DeadlineFilter, PriorityFilter } from '@/features/card/filter-cards'

import { useGetParamBoardId } from '@/shared/hooks'
import { Icon } from '@/shared/ui'

export const Filters = () => {
  const { boardId } = useGetParamBoardId()

  return (
    <Popover.Root>
      <Popover.Trigger className='focus-visible:styled-outline mr-5 flex items-center gap-2 desktop:mr-6'>
        <Icon
          name='filter'
          className='size-4 stroke-black/80 dark:stroke-white/80'
        />
        <h2>Filters</h2>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className='animation w-[300px] rounded-lg bg-white-soft p-6 shadow-main dark:bg-black-deep'
          collisionPadding={10}>
          <h2 className='border-b border-black/10 pb-3.5 text-xl dark:border-white/10'>
            Filters
          </h2>
          <Popover.Close className='focus-visible:styled-outline absolute right-3.5 top-3.5'>
            <Icon
              name='close'
              className='size-4.5 stroke-black dark:stroke-white'
            />
          </Popover.Close>
          <div className='my-3.5 flex justify-between'>
            <h3>Priority</h3>
            <Link
              to='/dashboard/$boardId'
              params={{ boardId: boardId! }}
              className='focus-visible:styled-outline text-md underline opacity-50 hocus:text-brand-light
                hocus:no-underline hocus:opacity-100 violet:hocus:text-brand-violet'>
              Show all
            </Link>
          </div>
          <PriorityFilter />
          <h3 className='my-3.5'>Deadline</h3>
          <DeadlineFilter />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
