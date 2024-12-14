import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import type { Dispatch, SetStateAction } from 'react'
import type { Column } from 'types'

import { arrayMove } from '@dnd-kit/sortable'

import { findIndexById } from 'lib'

import { useUpdateColumnsOrder } from './useUpdateColumnsOrder'

type UseCardDragHandlersProps = {
  columns: Column[] | undefined
  setColumns: Dispatch<SetStateAction<Column[] | undefined>>
  setActiveColumn: Dispatch<SetStateAction<Column | null>>
}

export const useColumnDragHandlers = ({
  columns,
  setColumns,
  setActiveColumn
}: UseCardDragHandlersProps) => {
  const { mutate: updateColumnsOrder } = useUpdateColumnsOrder()

  const onDragStart = ({ active }: DragStartEvent) => {
    setActiveColumn(active.data.current?.column)
  }

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveColumn(null)

    if (!active || !over || !columns) return

    const activeColumnIndex = findIndexById(columns, active.id as string)
    const overColumnIndex = findIndexById(columns, over.id as string)

    if (activeColumnIndex === overColumnIndex) return

    const updatedColumns = arrayMove(
      columns,
      activeColumnIndex,
      overColumnIndex
    )

    setColumns(updatedColumns)

    updateColumnsOrder({ ids: updatedColumns.map(c => c.id) })
  }

  return { onDragStart, onDragEnd }
}
