import type { ColumnTypes } from '@/entities/column'
import type { TaskTypes } from '@/entities/task'
import type { Dispatch, ReactNode, SetStateAction } from 'react'

export type DragAndDropContext = {
  columns: ColumnTypes.ColumnsSchema
  tasks: TaskTypes.TasksSchema
  activeColumn: ColumnTypes.ColumnSchema | null
  activeTask: TaskTypes.TaskSchema | null
}

export type DragAndDropProviderProps = {
  children: ReactNode
  initialColumns: ColumnTypes.ColumnsSchema | undefined
}

export type TaskDragHandlersProps = Pick<DragAndDropContext, 'tasks'> & {
  setTasks: Dispatch<SetStateAction<TaskTypes.TasksSchema>>
  setActiveTask: Dispatch<SetStateAction<TaskTypes.TaskSchema | null>>
}

export type ColumnDragHandlersProps = Pick<DragAndDropContext, 'columns'> & {
  setColumns: Dispatch<SetStateAction<ColumnTypes.ColumnsSchema>>
  setActiveColumn: Dispatch<SetStateAction<ColumnTypes.ColumnSchema | null>>
}
