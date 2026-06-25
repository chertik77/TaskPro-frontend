import type { ColumnTypes } from '@/entities/column'
import type { TaskTypes } from '@/entities/task'

import { useMemo, useState } from 'react'
import { parse } from 'valibot'

import { ColumnContracts } from '@/entities/column'

export const useDndState = (
  initialColumns: ColumnTypes.ColumnsSchema | undefined
) => {
  const parsedColumns = useMemo(
    () => parse(ColumnContracts.ColumnsSchema, initialColumns),
    [initialColumns]
  )

  const [columns, setColumns] = useState(parsedColumns)
  const [tasks, setTasks] = useState(parsedColumns.flatMap(c => c.tasks))
  const [prevInitialColumns, setPrevInitialColumns] = useState(initialColumns)

  const [activeTask, setActiveTask] = useState<TaskTypes.TaskSchema | null>(
    null
  )

  const [activeColumn, setActiveColumn] =
    useState<ColumnTypes.ColumnSchema | null>(null)

  if (initialColumns !== prevInitialColumns) {
    setPrevInitialColumns(initialColumns)

    const parsedColumns = parse(ColumnContracts.ColumnsSchema, initialColumns)

    setColumns(parsedColumns)
    setTasks(parsedColumns.flatMap(c => c.tasks))
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
