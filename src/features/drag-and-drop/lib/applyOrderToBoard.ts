import type { Column, Task } from '@/shared/api'

const isSameTaskList = (a: Task[] | undefined, b: Task[]) =>
  !!a && a.length === b.length && a.every((task, index) => task === b[index])

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

  return columns.map(column => {
    const nextTasks = byColumn.get(column.id) ?? []

    if (isSameTaskList(column.tasks, nextTasks)) return column

    return { ...column, tasks: nextTasks }
  })
}
