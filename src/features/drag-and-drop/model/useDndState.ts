import type { Column, Task } from '@/shared/api'
import type { TasksByColumn } from './types'

import { useCallback, useEffect, useRef, useState } from 'react'

import { groupTasksByColumn } from '../lib/groupTasksByColumn'

type TaskState = {
  tasks: Task[]
  tasksByColumn: TasksByColumn
}

const flattenTasks = (columns: Column[] | undefined) =>
  columns?.flatMap(column => column.tasks ?? []) ?? []

const createTaskState = (
  tasks: Task[],
  previous: TasksByColumn
): TaskState => ({
  tasks,
  tasksByColumn: groupTasksByColumn(tasks, previous)
})

export const useDndState = (initialColumns: Column[] | undefined) => {
  const [columns, setColumns] = useState<Column[]>(initialColumns ?? [])

  const [taskState, setTaskState] = useState<TaskState>(() =>
    createTaskState(flattenTasks(initialColumns), {})
  )

  const [prevInitialColumns, setPrevInitialColumns] = useState(initialColumns)

  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const [activeColumn, setActiveColumn] = useState<Column | null>(null)

  if (initialColumns !== prevInitialColumns) {
    setPrevInitialColumns(initialColumns)

    setColumns(initialColumns ?? [])
    setTaskState(prev =>
      createTaskState(flattenTasks(initialColumns), prev.tasksByColumn)
    )
  }

  const taskStateRef = useRef(taskState)
  const columnsRef = useRef(columns)
  const tasksRef = useRef(taskState.tasks)

  useEffect(() => {
    taskStateRef.current = taskState
    tasksRef.current = taskState.tasks
  }, [taskState])

  useEffect(() => {
    columnsRef.current = columns
  }, [columns])

  const applyTasks = useCallback((updater: (prev: Task[]) => Task[]) => {
    const previous = taskStateRef.current

    const nextTasks = updater(previous.tasks)

    if (nextTasks === previous.tasks) return

    const next = createTaskState(nextTasks, previous.tasksByColumn)

    taskStateRef.current = next
    tasksRef.current = next.tasks

    setTaskState(next)
  }, [])

  const applyColumns = useCallback((updater: (prev: Column[]) => Column[]) => {
    const next = updater(columnsRef.current)

    if (next === columnsRef.current) return

    columnsRef.current = next

    setColumns(next)
  }, [])

  const getColumnTaskIds = useCallback(
    (columnId: string) =>
      (taskStateRef.current.tasksByColumn[columnId] ?? []).map(task => task.id),
    []
  )

  return {
    columns,
    tasks: taskState.tasks,
    tasksByColumn: taskState.tasksByColumn,
    activeColumn,
    activeTask,
    tasksRef,
    columnsRef,
    applyTasks,
    applyColumns,
    getColumnTaskIds,
    setActiveColumn,
    setActiveTask
  }
}
