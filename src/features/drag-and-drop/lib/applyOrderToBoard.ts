import type { Column, Task } from '@/shared/api'

import { groupTasksByColumn, isSameTaskList } from './groupTasksByColumn'

export const applyTaskOrder = (
  columns: Column[] | undefined,
  tasks: Task[]
) => {
  if (!columns) return columns

  const byColumn = groupTasksByColumn(tasks)

  return columns.map(column => {
    const nextTasks = byColumn[column.id] ?? []

    if (isSameTaskList(column.tasks, nextTasks)) return column

    return { ...column, tasks: nextTasks }
  })
}
