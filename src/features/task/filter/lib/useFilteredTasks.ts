import type { Task } from '@/shared/api'
import type { IFuseOptions } from 'fuse.js'

import { useMemo } from 'react'
import { addDays, startOfToday } from 'date-fns'
import Fuse from 'fuse.js'

import { matchesDeadline } from './match-deadline'
import { sortTasks } from './sort-tasks'
import { useTaskFilters } from './useTaskFilters'

const fuseOptions: IFuseOptions<Task> = {
  keys: [
    { name: 'title', weight: 0.6 },
    { name: 'description', weight: 0.25 },
    { name: 'labels.name', weight: 0.15 }
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2
}

export const useFilteredTasks = (tasks: Task[]) => {
  const { search, priority, deadline, labels, sort, dir } = useTaskFilters()

  const fuse = useMemo(() => new Fuse(tasks, fuseOptions), [tasks])

  return useMemo(() => {
    let filteredTasks = search
      ? fuse.search(search).map(({ item }) => item)
      : tasks

    if (priority.length) {
      filteredTasks = filteredTasks.filter(task =>
        priority.includes(task.priority)
      )
    }

    if (labels.length) {
      filteredTasks = filteredTasks.filter(task =>
        task.labels?.some(label => labels.includes(label.id))
      )
    }

    if (deadline.length) {
      const today = startOfToday()
      const range = { today, nextWeek: addDays(today, 7) }

      filteredTasks = filteredTasks.filter(task =>
        deadline.some(preset => matchesDeadline(task, preset, range))
      )
    }

    return sortTasks(filteredTasks, sort, dir)
  }, [tasks, fuse, search, priority, deadline, labels, sort, dir])
}
