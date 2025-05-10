import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import type { ColumnDragHandlersProps } from '../dnd.types'

import { arrayMove } from '@dnd-kit/sortable'

import { findIndexById } from '@/shared/utils'

import { useUpdateColumnOrder } from './useUpdateColumnOrder'

export const useColumnDragHandlers = ({
  columns,
  setActiveColumn,
  setColumns
}: ColumnDragHandlersProps) => {
  const { mutate: updateColumnOrder } = useUpdateColumnOrder()

  const onDragStart = ({ active }: DragStartEvent) => {
    if (!active || active.data.current?.type !== 'column') return

    setActiveColumn(active.data.current?.entity)
  }

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!active || active.data.current?.type !== 'column') return

    setActiveColumn(null)

    if (!over || !columns) return

    const activeColumnIndex = findIndexById(columns, active.id as string)
    const overColumnIndex = findIndexById(columns, over.id as string)

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
