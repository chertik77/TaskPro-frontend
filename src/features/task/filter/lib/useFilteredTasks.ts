import type { Task } from '@/shared/api'
import type { IFuseOptions } from 'fuse.js'

import { useMemo } from 'react'
import {
  addDays,
  isAfter,
  isBefore,
  isWithinInterval,
  startOfToday
} from 'date-fns'
import Fuse from 'fuse.js'

import { useTaskFilters } from './useTaskFilters'

const today = startOfToday()
const nextWeek = addDays(today, 7)

const fuseOptions: IFuseOptions<Task> = {
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'description', weight: 0.3 }
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2
}

export const useFilteredTasks = (tasks: Task[]) => {
  const { priority, deadline, search } = useTaskFilters()

  const fuse = useMemo(() => new Fuse(tasks, fuseOptions), [tasks])

  if (!priority && !deadline && !search) return tasks

  let filteredTasks = tasks

  if (search) {
    filteredTasks = fuse.search(search).map(({ item }) => item)
  }

  if (priority) {
    filteredTasks = filteredTasks.filter(task => task.priority === priority)
  }

  if (deadline) {
    filteredTasks = filteredTasks.filter(task => {
      const taskDeadline = task.deadline

      if (!taskDeadline) return false

      if (deadline === 'Overdue') return isBefore(taskDeadline, today)

      if (deadline === 'Upcoming') {
        return isWithinInterval(taskDeadline, {
          start: today,
          end: nextWeek
        })
      }

      if (deadline === 'Far Future') return isAfter(taskDeadline, nextWeek)

      return true
    })
  }

  return filteredTasks
}
