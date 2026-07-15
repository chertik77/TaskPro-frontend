import type { ColumnTypes } from '@/entities/column'
import type { TaskTypes } from '@/entities/task'

import { useMemo, useState } from 'react'
import { parse } from 'valibot'

import { ColumnContracts } from '@/entities/column'
import { TaskContracts } from '@/entities/task'

export const useDndState = (
  initialColumns: ColumnTypes.ColumnsSchema | undefined
) => {
  const [parsedColumns, parsedTasks] = useMemo(
    () => [
      parse(ColumnContracts.ColumnsSchema, initialColumns),
      parse(
        TaskContracts.TasksSchema,
        initialColumns?.flatMap(c => c.tasks)
      )
    ],
    [initialColumns]
  )

  const [columns, setColumns] = useState(parsedColumns)
  const [tasks, setTasks] = useState(parsedTasks)
  const [prevInitialColumns, setPrevInitialColumns] = useState(initialColumns)

  const [activeTask, setActiveTask] = useState<TaskTypes.TaskSchema | null>(
    null
  )

  const [activeColumn, setActiveColumn] =
    useState<ColumnTypes.ColumnSchema | null>(null)

  if (initialColumns !== prevInitialColumns) {
    setPrevInitialColumns(initialColumns)

    const parsedColumns = parse(ColumnContracts.ColumnsSchema, initialColumns)
    const parsedTasks = parse(
      TaskContracts.TasksSchema,
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
