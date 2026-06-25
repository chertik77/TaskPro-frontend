import type { ColumnTypes } from '@/entities/column'
import type { TaskTypes } from '@/entities/task'
import type { UniqueIdentifier } from '@dnd-kit/core'

export const getDraggingTaskData = (
  taskId: UniqueIdentifier,
  columnId: string | null,
  columns: ColumnTypes.ColumnsSchema,
  tasks: TaskTypes.TasksSchema
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
