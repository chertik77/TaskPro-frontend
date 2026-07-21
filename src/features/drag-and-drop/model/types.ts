import type { Column, Task } from '@/shared/api'
import type { Dispatch, ReactNode, SetStateAction } from 'react'

export type DragAndDropContext = {
  columns: Column[]
  tasks: Task[]
  activeColumn: Column | null
  activeTask: Task | null
}

export type DragAndDropProviderProps = {
  children: ReactNode
  initialColumns: Column[] | undefined
}

export type TaskDragHandlersProps = Pick<DragAndDropContext, 'tasks'> & {
  setTasks: Dispatch<SetStateAction<Task[]>>
  setActiveTask: Dispatch<SetStateAction<Task | null>>
}

export type ColumnDragHandlersProps = Pick<DragAndDropContext, 'columns'> & {
  setColumns: Dispatch<SetStateAction<Column[]>>
  setActiveColumn: Dispatch<SetStateAction<Column | null>>
}
