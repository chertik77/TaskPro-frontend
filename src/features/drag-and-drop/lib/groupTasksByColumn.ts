import type { Task } from '@/shared/api'
import type { TasksByColumn } from '../model/types'

export const isSameTaskList = (a: Task[] | undefined, b: Task[] | undefined) =>
  !!a &&
  !!b &&
  a.length === b.length &&
  a.every((task, index) => task === b[index])

export const groupTasksByColumn = (
  tasks: Task[],
  previous: TasksByColumn = {}
): TasksByColumn => {
  const grouped: TasksByColumn = {}

  for (const task of tasks) {
    ;(grouped[task.columnId] ??= []).push(task)
  }

  for (const [columnId, nextList] of Object.entries(grouped)) {
    const previousList = previous[columnId]

    if (isSameTaskList(previousList, nextList))
      grouped[columnId] = previousList!
  }

  return grouped
}
