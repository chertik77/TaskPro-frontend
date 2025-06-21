import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import type { ColumnDragHandlersProps } from '../model/types'

import { arrayMove } from '@dnd-kit/sortable'

import { useUpdateColumnOrder } from '../api/useUpdateColumnOrder'

export const useColumnDragHandlers = ({
  columns,
  setActiveColumn,
  setColumns
}: ColumnDragHandlersProps) => {
  const { mutate: updateColumnOrder } = useUpdateColumnOrder()

  const onDragStart = ({ active }: DragStartEvent) => {
    if (!active || active.data.current?.type !== 'column') return

    setActiveColumn(active.data.current.column)
  }

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveColumn(null)

    if (!active || !over || active.data.current?.type !== 'column') return

    const activeColumnIndex = columns.findIndex(c => c.id === active.id)
    const overColumnIndex = columns.findIndex(c => c.id === over.id)

    if (activeColumnIndex === overColumnIndex) return

    const updatedColumns = arrayMove(
      columns,
      activeColumnIndex,
      overColumnIndex
    )

    setColumns(updatedColumns)

    updateColumnOrder({ ids: updatedColumns.map(c => c.id) })
  }

  return { onDragStart, onDragEnd }
}
