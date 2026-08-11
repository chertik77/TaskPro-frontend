import { useQuery } from '@tanstack/react-query'

import { LABEL_BASE_COLOR_MAP, labelQueries } from '@/entities/label'

import { cn } from '@/shared/lib'
import { Loader } from '@/shared/ui'

import { useTaskFilters } from '../lib/useTaskFilters'
import { FilterOption } from './FilterOption'

export const LabelFilter = () => {
  const { labels, toggleFilter } = useTaskFilters()

  const { data: allLabels = [], isPending } = useQuery(labelQueries.list())

  if (isPending) {
    return (
      <div
        className='text-md flex items-center gap-1 text-black/50
          dark:text-white/50'>
        <Loader className='size-5' />
        Loading labels...
      </div>
    )
  }

  if (!allLabels.length) {
    return (
      <p className='text-md text-black/50 dark:text-white/50'>
        You have no labels yet.
      </p>
    )
  }

  return (
    <div className='flex max-h-40 flex-col gap-2 overflow-y-auto'>
      {allLabels.map(label => (
        <FilterOption
          key={label.id}
          isChecked={labels.includes(label.id)}
          onCheckedChange={() => toggleFilter('labels', label.id)}>
          <span
            className={cn(
              'size-2.5 shrink-0 rounded-full',
              LABEL_BASE_COLOR_MAP[label.color]
            )}
          />
          <span className='truncate'>{label.name}</span>
        </FilterOption>
      ))}
    </div>
  )
}
