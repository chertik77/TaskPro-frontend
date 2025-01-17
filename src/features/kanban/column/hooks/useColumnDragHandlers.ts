import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import type { DragAndDropContext } from 'features/kanban/dnd/dnd.context'
import type { Dispatch, SetStateAction } from 'react'
import type { ColumnTypes } from 'shared/api/column'

import { arrayMove } from '@dnd-kit/sortable'

import { findIndexById } from 'features/kanban/dnd/utils'

import { useUpdateColumnsOrder } from './useUpdateColumnsOrder'

export const useColumnDragHandlers = ({
  columns,
  setColumns,
  setActiveColumn
}: Pick<DragAndDropContext, 'columns' | 'setColumns'> & {
  setActiveColumn: Dispatch<SetStateAction<ColumnTypes.Column | null>>
}) => {
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
