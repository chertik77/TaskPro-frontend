import type { TaskSortDirection, TaskSortField } from '@/entities/task'

import { ArrowDownWideNarrowIcon, ArrowUpNarrowWideIcon } from 'lucide-react'
import * as m from 'motion/react-m'

import { TASK_SORT_FIELD_LABELS, TASK_SORT_FIELDS } from '@/entities/task'

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/shared/ui'

import { useTaskFilters } from '../lib/useTaskFilters'

const INITIAL_DIRECTION: Record<TaskSortField, TaskSortDirection> = {
  manual: 'asc',
  deadline: 'asc',
  priority: 'desc',
  title: 'asc',
  created: 'desc'
}

export const SortFilter = () => {
  const { sort, dir, setFilter, setFilters } = useTaskFilters()

  const isAscending = dir === 'asc'

  return (
    <div className='flex items-center gap-2'>
      <Select
        value={sort}
        onValueChange={value => {
          const field = value as TaskSortField

          setFilters({ sort: field, dir: INITIAL_DIRECTION[field] })
        }}>
        <SelectTrigger className='text-md flex-1 justify-between py-2'>
          {TASK_SORT_FIELD_LABELS[sort]}
        </SelectTrigger>
        <SelectContent className='p-3.5'>
          {TASK_SORT_FIELDS.map(field => (
            <SelectItem
              key={field}
              value={field}>
              {TASK_SORT_FIELD_LABELS[field]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <button
        type='button'
        title={isAscending ? 'Ascending' : 'Descending'}
        aria-label={`Sort ${isAscending ? 'ascending' : 'descending'}`}
        onClick={() => setFilter('dir', isAscending ? 'desc' : 'asc')}
        className='focus-visible:styled-outline border-accent/50
          hocus:border-accent grid shrink-0 place-items-center rounded-lg border
          p-2.5 transition-all'>
        <m.span
          key={dir}
          initial={{ rotate: isAscending ? -90 : 90 }}
          animate={{ rotate: 0 }}
          transition={{ ease: [0.22, 1, 0.36, 1] }}>
          {isAscending ? (
            <ArrowUpNarrowWideIcon className='size-4' />
          ) : (
            <ArrowDownWideNarrowIcon className='size-4' />
          )}
        </m.span>
      </button>
    </div>
  )
}
