import type { ReactNode } from 'react'

import { useRef } from 'react'
import { FunnelIcon } from 'lucide-react'

import {
  DeadlineFilter,
  LabelFilter,
  PriorityFilter,
  SearchFilter,
  useTaskFilters
} from '@/features/task/filter'

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from '@/shared/ui'

type FilterSectionProps = { title: string; children: ReactNode }

const FilterSection = ({ title, children }: FilterSectionProps) => (
  <section className='space-y-3.5'>
    <h3>{title}</h3>
    {children}
  </section>
)

export const Filters = () => {
  const { activeFiltersCount, resetFilters } = useTaskFilters()

  const searchInputRef = useRef<HTMLInputElement>(null)

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
        initialFocus={searchInputRef}
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
        <div
          className='max-h-[min(65vh,34rem)] space-y-4.5 overflow-y-auto px-6
            pt-4.5 pb-6'>
          <SearchFilter ref={searchInputRef} />
          <div className='border-b border-black/10 dark:border-white/10' />
          <FilterSection title='Priority'>
            <PriorityFilter />
          </FilterSection>
          <FilterSection title='Deadline'>
            <DeadlineFilter />
          </FilterSection>
          <FilterSection title='Labels'>
            <LabelFilter />
          </FilterSection>
        </div>
      </PopoverContent>
    </Popover>
  )
}
