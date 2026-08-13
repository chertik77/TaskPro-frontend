import type { TaskDeadline } from '@/entities/task'
import type { Task } from '@/shared/api'

import { isAfter, isBefore, isToday, isWithinInterval } from 'date-fns'

import { parseDeadline } from '@/entities/task'

type DeadlineRange = { today: Date; nextWeek: Date }

export const matchesDeadline = (
  task: Task,
  preset: TaskDeadline,
  { today, nextWeek }: DeadlineRange
) => {
  const deadline = parseDeadline(task.deadline)

  if (preset === 'No Deadline') return !deadline

  if (!deadline) return false

  if (preset === 'Today') return isToday(deadline)

  if (preset === 'Overdue') return isBefore(deadline, today)

  if (preset === 'Upcoming') {
    return isWithinInterval(deadline, { start: today, end: nextWeek })
  }

  return isAfter(deadline, nextWeek)
}
