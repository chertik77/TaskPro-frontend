import type { Column, Task } from '@/shared/api'
import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react'

export type TasksByColumn = Record<string, Task[]>

export type DragAndDropContext = {
  columns: Column[]
  tasksByColumn: TasksByColumn
  activeColumn: Column | null
  activeTask: Task | null
}

export type DragAndDropProviderProps = {
  children: ReactNode
  initialColumns: Column[] | undefined
}

export type TaskDragHandlersProps = {
  tasksRef: RefObject<Task[]>
  applyTasks: (updater: (prev: Task[]) => Task[]) => void
  setActiveTask: Dispatch<SetStateAction<Task | null>>
}

export type ColumnDragHandlersProps = {
  columnsRef: RefObject<Column[]>
  applyColumns: (updater: (prev: Column[]) => Column[]) => void
  setActiveColumn: Dispatch<SetStateAction<Column | null>>
}
