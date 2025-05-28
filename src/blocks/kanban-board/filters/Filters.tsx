import { Link } from '@tanstack/react-router'

import { DeadlineFilter, PriorityFilter } from '@/features/card/filter-cards'

import { useGetParamBoardId } from '@/shared/hooks'
import {
  Icon,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from '@/shared/ui'

export const Filters = () => {
  const { boardId } = useGetParamBoardId()

  return (
    <Popover>
      <PopoverTrigger className='focus-visible:styled-outline desktop:mr-6 mr-5 flex items-center gap-2'>
        <Icon
          name='filter'
          className='size-4 stroke-black/80 dark:stroke-white/80'
        />
        <h2>Filters</h2>
      </PopoverTrigger>
      <PopoverContent
        className='bg-white-soft dark:bg-black-deep dark:border-brand/50 w-[300px] p-6 dark:border'
        collisionPadding={10}>
        <h2 className='border-b border-black/10 pb-3.5 text-xl dark:border-white/10'>
          Filters
        </h2>
        <PopoverClose className='absolute top-3.5 right-3.5' />
        <div className='my-3.5 flex justify-between'>
          <h3>Priority</h3>
          <Link
            to='/dashboard/$boardId'
            params={{ boardId: boardId! }}
            className='focus-visible:styled-outline text-md hocus:text-brand-light hocus:no-underline
              hocus:opacity-100 violet:hocus:text-brand-violet underline opacity-50'>
            Show all
          </Link>
        </div>
        <PriorityFilter />
        <h3 className='my-3.5'>Deadline</h3>
        <DeadlineFilter />
      </PopoverContent>
    </Popover>
  )
}
