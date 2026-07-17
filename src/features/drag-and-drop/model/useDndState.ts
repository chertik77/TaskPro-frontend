import type { Column, Task } from '@/shared/api'

import { useMemo, useState } from 'react'
import { array, parse } from 'valibot'

import { vColumn, vTask } from '@/shared/api'

export const useDndState = (initialColumns: Column[] | undefined) => {
  const [parsedColumns, parsedTasks] = useMemo(
    () => [
      parse(array(vColumn), initialColumns),
      parse(
        array(vTask),
        initialColumns?.flatMap(c => c.tasks)
      )
    ],
    [initialColumns]
  )

  const [columns, setColumns] = useState(parsedColumns)
  const [tasks, setTasks] = useState(parsedTasks)
  const [prevInitialColumns, setPrevInitialColumns] = useState(initialColumns)

  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const [activeColumn, setActiveColumn] = useState<Column | null>(null)

  if (initialColumns !== prevInitialColumns) {
    setPrevInitialColumns(initialColumns)

    const parsedColumns = parse(array(vColumn), initialColumns)
    const parsedTasks = parse(
      array(vTask),
      parsedColumns.flatMap(c => c.tasks)
    )

    setColumns(parsedColumns)
    setTasks(parsedTasks)
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
