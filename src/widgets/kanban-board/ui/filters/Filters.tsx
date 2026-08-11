import type { Variants } from 'motion/react'
import type { ReactNode } from 'react'

import { FunnelIcon } from 'lucide-react'
import { stagger } from 'motion/react'
import * as m from 'motion/react-m'

import {
  DeadlineFilter,
  LabelFilter,
  PriorityFilter,
  SearchFilter,
  SortFilter,
  useTaskFilters
} from '@/features/task/filter'

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

type FilterSectionProps = { title: string; children: ReactNode }

const FilterSection = ({ title, children }: FilterSectionProps) => (
  <m.section
    variants={item}
    className='space-y-3.5'>
    <h3>{title}</h3>
    {children}
  </m.section>
)

export const Filters = () => {
  const { activeFiltersCount, resetFilters } = useTaskFilters()

  return (
    <Popover>
      <PopoverTrigger
        className='focus-visible:styled-outline desktop:mr-6 mr-5 flex
          items-center gap-2'>
        <FunnelIcon className='size-4' />
        <h2>Filters</h2>
        {activeFiltersCount > 0 && (
          <span
            className='bg-accent grid size-5 place-content-center rounded-full
              text-sm text-black'>
            {activeFiltersCount}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent
        positionerProps={{
          collisionAvoidance: { side: 'none' },
          collisionPadding: 10
        }}
        className='bg-white-soft dark:bg-black-deep dark:border-accent/50 w-80
          p-0 dark:border'>
        <div className='flex items-center justify-between px-6 pt-7 pr-12'>
          <h2 className='text-xl'>Filters</h2>
          <button
            type='button'
            disabled={!activeFiltersCount}
            onClick={resetFilters}
            className='focus-visible:styled-outline text-md hocus:text-accent
              hocus:no-underline hocus:opacity-100 underline opacity-50
              disabled:pointer-events-none disabled:opacity-30'>
            Clear all
          </button>
        </div>
        <PopoverClose className='absolute top-3.5 right-3.5' />
        <m.div
          variants={container}
          initial='hidden'
          animate='show'
          className='max-h-[min(65vh,34rem)] space-y-4.5 overflow-y-auto px-6
            pt-4.5 pb-6'>
          <m.div variants={item}>
            <SearchFilter />
          </m.div>
          <div className='border-b border-black/10 dark:border-white/10' />
          <FilterSection title='Sort by'>
            <SortFilter />
          </FilterSection>
          <FilterSection title='Priority'>
            <PriorityFilter />
          </FilterSection>
          <FilterSection title='Deadline'>
            <DeadlineFilter />
          </FilterSection>
          <FilterSection title='Labels'>
            <LabelFilter />
          </FilterSection>
        </m.div>
      </PopoverContent>
    </Popover>
  )
}
