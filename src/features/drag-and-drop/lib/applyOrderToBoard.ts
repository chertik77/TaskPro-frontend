import type { Column, Task } from '@/shared/api'

export const applyTaskOrder = (
  columns: Column[] | undefined,
  tasks: Task[]
) => {
  if (!columns) return columns

  const byColumn = new Map<string, Task[]>()

  for (const task of tasks) {
    const list = byColumn.get(task.columnId)

    if (list) list.push(task)
    else byColumn.set(task.columnId, [task])
  }

  return columns.map(column => ({
    ...column,
    tasks: byColumn.get(column.id) ?? []
  }))
}
