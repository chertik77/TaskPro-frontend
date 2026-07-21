import type { Column, Task } from '@/shared/api'
import type { UniqueIdentifier } from '@dnd-kit/core'

export const getDraggingTaskData = (
  taskId: UniqueIdentifier,
  columnId: string | null,
  columns: Column[],
  tasks: Task[]
) => {
  const columnTasks = tasks.filter(c => c.columnId === columnId)
  const taskPosition = columnTasks.findIndex(c => c.id === taskId)
  const column = columns.find(c => c.id === columnId)

  return {
    columnTasks,
    taskPosition,
    column
  }
}
