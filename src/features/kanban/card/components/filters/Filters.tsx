import * as Popover from '@radix-ui/react-popover'
import { Link } from '@tanstack/react-router'

import { useGetParamBoardId } from '@/features/kanban/board/hooks'

import { Icon } from '@/shared/components/ui'

import { DeadlineFilter } from './DeadlineFilter'
import { PriorityFilter } from './PriorityFilter'

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
          className='animation w-[300px] rounded-lg bg-white-primary p-6 shadow-select
            dark:bg-black-fourth'
          collisionPadding={10}>
          <h2 className='border-b border-black/10 pb-3.5 text-lg dark:border-white/10'>
            Filters
          </h2>
          <Popover.Close className='focus-visible:styled-outline absolute right-3.5 top-3.5'>
            <Icon
              name='close'
              className='size-lg stroke-black dark:stroke-white'
            />
          </Popover.Close>
          <div className='my-3.5 flex justify-between'>
            <h3>Priority</h3>
            <Link
              to='/dashboard/$boardId'
              params={{ boardId: boardId! }}
              className='focus-visible:styled-outline text-sm underline opacity-50 hocus:text-brand-hover
                hocus:no-underline hocus:opacity-100 violet:hocus:text-brand-secondary'>
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
