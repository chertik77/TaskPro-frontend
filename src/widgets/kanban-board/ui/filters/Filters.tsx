import type { Variants } from 'motion/react'

import { Link } from '@tanstack/react-router'
import { FunnelIcon } from 'lucide-react'
import { stagger } from 'motion/react'
import * as m from 'motion/react-m'

import {
  DeadlineFilter,
  PriorityFilter,
  SearchFilter
} from '@/features/task/filter'

import { useGetParamBoardId } from '@/entities/board'

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from '@/shared/ui'

const container: Variants = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.06) } }
}

const item: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
  }
}

export const Filters = () => {
  const boardId = useGetParamBoardId()

  return (
    <Popover>
      <PopoverTrigger
        className='focus-visible:styled-outline desktop:mr-6 mr-5 flex
          items-center gap-2'>
        <div className='flex items-center gap-2'>
          <FunnelIcon className='size-4' />
          <h2>Filters</h2>
        </div>
      </PopoverTrigger>
      <PopoverContent
        positionerProps={{
          collisionAvoidance: { side: 'none' },
          collisionPadding: 10
        }}
        className='bg-white-soft dark:bg-black-deep dark:border-brand/50 w-75
          p-6 dark:border'>
        <m.div
          variants={container}
          initial='hidden'
          animate='show'>
          <h2 className='mb-4.5 text-xl'>Filters</h2>
          <m.div variants={item}>
            <SearchFilter />
          </m.div>
          <div className='border-b border-black/10 pb-4.5 dark:border-white/10' />
          <PopoverClose className='absolute top-3.5 right-3.5' />
          <m.div
            variants={item}
            className='mt-4.5 mb-3.5 flex justify-between'>
            <h3>Priority</h3>
            <Link
              to='/dashboard/$boardId'
              params={{ boardId: boardId! }}
              search={prev => ({
                ...prev,
                priority: undefined,
                deadline: undefined
              })}
              className='focus-visible:styled-outline text-md
                hocus:text-brand-light hocus:no-underline hocus:opacity-100
                underline opacity-50'>
              Show all
            </Link>
          </m.div>
          <m.div variants={item}>
            <PriorityFilter />
          </m.div>
          <m.h3
            variants={item}
            className='mt-4.5 mb-3.5'>
            Deadline
          </m.h3>
          <m.div variants={item}>
            <DeadlineFilter />
          </m.div>
        </m.div>
      </PopoverContent>
    </Popover>
  )
}
