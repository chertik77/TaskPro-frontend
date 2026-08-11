import type { TaskTypes } from '@/entities/task'

import { useNavigate, useSearch } from '@tanstack/react-router'

type Filters = TaskTypes.TaskSearchSchema
type ArrayKey = TaskTypes.TaskArrayFilterKey

export const DEFAULT_FILTERS: Filters = {
  search: '',
  priority: [],
  deadline: [],
  labels: [],
  sort: 'manual',
  dir: 'asc'
}

export const useTaskFilters = () => {
  const filters = useSearch({ from: '/dashboard/$boardId' })

  const navigate = useNavigate({ from: '/dashboard/$boardId' })

  const setFilters = (values: Partial<Filters>) => {
    navigate({ search: prev => ({ ...prev, ...values }) })
  }

  const setFilter = <TKey extends keyof Filters>(
    key: TKey,
    value: Filters[TKey]
  ) => setFilters({ [key]: value } as Partial<Filters>)

  const toggleFilter = <TKey extends ArrayKey>(
    key: TKey,
    value: Filters[TKey][number]
  ) => {
    navigate({
      search: prev => {
        const current = prev[key] as string[]

        return {
          ...prev,
          [key]: current.includes(value)
            ? current.filter(item => item !== value)
            : [...current, value]
        }
      }
    })
  }

  const resetFilters = () => navigate({ search: DEFAULT_FILTERS })

  const activeFiltersCount =
    filters.priority.length +
    filters.deadline.length +
    filters.labels.length +
    (filters.search ? 1 : 0) +
    (filters.sort === 'manual' ? 0 : 1)

  return {
    ...filters,
    setFilter,
    setFilters,
    toggleFilter,
    resetFilters,
    activeFiltersCount
  }
}
