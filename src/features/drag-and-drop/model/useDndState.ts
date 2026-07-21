import type { Column, Task } from '@/shared/api'

import { useState } from 'react'

export const useDndState = (initialColumns: Column[] | undefined) => {
  const [columns, setColumns] = useState<Column[]>(initialColumns ?? [])

  const [tasks, setTasks] = useState<Task[]>(
    initialColumns?.flatMap(c => c.tasks ?? []) ?? []
  )

  const [prevInitialColumns, setPrevInitialColumns] = useState(initialColumns)

  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const [activeColumn, setActiveColumn] = useState<Column | null>(null)

  if (initialColumns !== prevInitialColumns) {
    setPrevInitialColumns(initialColumns)

    setColumns(initialColumns ?? [])
    setTasks(initialColumns?.flatMap(c => c.tasks ?? []) ?? [])
  }

  return {
    columns,
    tasks,
    activeColumn,
    activeTask,
    setColumns,
    setTasks,
    setActiveColumn,
    setActiveTask
  }
}
