import type { Task } from '@/shared/api'
import type { TasksByColumn } from '../model/types'

export const groupTasksByColumn = (
  tasks: Task[],
  previous: TasksByColumn
): TasksByColumn => {
  const grouped: TasksByColumn = {}

  for (const task of tasks) {
    const list = grouped[task.columnId]

    if (list) list.push(task)
    else grouped[task.columnId] = [task]
  }

  for (const columnId of Object.keys(grouped)) {
    const nextList = grouped[columnId]
    const previousList = previous[columnId]

    if (!nextList || !previousList) continue

    const isUnchanged =
      previousList.length === nextList.length &&
      previousList.every((task, index) => task === nextList[index])

    if (isUnchanged) grouped[columnId] = previousList
  }

  return grouped
}
