import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'

import { arrayMove } from '@dnd-kit/sortable'

import { useDragAndDrop } from '@/entities/dnd'

import { findIndexById } from '@/shared/utils'

import { useUpdateColumnOrder } from './useUpdateColumnOrder'

export const useColumnDragHandlers = () => {
  const { columns, setColumns, setActiveColumn } = useDragAndDrop()

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
