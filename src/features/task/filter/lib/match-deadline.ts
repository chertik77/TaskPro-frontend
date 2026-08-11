import type { TaskDeadline } from '@/entities/task'
import type { Task } from '@/shared/api'

import { isAfter, isBefore, isToday, isWithinInterval } from 'date-fns'

type DeadlineRange = { today: Date; nextWeek: Date }

export const matchesDeadline = (
  task: Task,
  preset: TaskDeadline,
  { today, nextWeek }: DeadlineRange
) => {
  if (preset === 'No Deadline') return !task.deadline

  if (!task.deadline) return false

  if (preset === 'Today') return isToday(task.deadline)

  if (preset === 'Overdue') return isBefore(task.deadline, today)

  if (preset === 'Upcoming') {
    return isWithinInterval(task.deadline, { start: today, end: nextWeek })
  }

  return isAfter(task.deadline, nextWeek)
}
