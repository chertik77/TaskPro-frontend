import type { TaskSortDirection, TaskSortField } from '@/entities/task'
import type { Task } from '@/shared/api'

import { compareAsc } from 'date-fns'

import { TASK_PRIORITY_ORDER } from '@/entities/task'

// Tasks without a deadline always sort after the dated ones
const compareDeadlines = (a: Task, b: Task) => {
  if (!a.deadline || !b.deadline) {
    return Number(!!b.deadline) - Number(!!a.deadline)
  }

  return compareAsc(a.deadline, b.deadline)
}

const COMPARATORS: Record<
  Exclude<TaskSortField, 'manual'>,
  (a: Task, b: Task) => number
> = {
  deadline: compareDeadlines,
  priority: (a, b) =>
    TASK_PRIORITY_ORDER[a.priority] - TASK_PRIORITY_ORDER[b.priority],
  title: (a, b) => a.title.localeCompare(b.title),
  created: (a, b) => compareAsc(a.createdAt, b.createdAt)
}

export const sortTasks = (
  tasks: Task[],
  field: TaskSortField,
  direction: TaskSortDirection
) => {
  if (field === 'manual') {
    return direction === 'asc' ? tasks : [...tasks].reverse()
  }

  const sorted = [...tasks].sort(COMPARATORS[field])

  return direction === 'asc' ? sorted : sorted.reverse()
}
