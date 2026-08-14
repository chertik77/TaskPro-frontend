import type { Column } from '@/shared/api'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import type { ColumnDragHandlersProps } from '../model/types'

import { useRef } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

import { useUpdateColumnOrder } from '../api/useUpdateColumnOrder'

export const useColumnDragHandlers = ({
  applyColumns,
  columnsRef,
  setActiveColumn
}: ColumnDragHandlersProps) => {
  const { mutate: updateColumnOrder } = useUpdateColumnOrder()

  const snapshotRef = useRef<Column[] | null>(null)

  const onDragStart = ({ active }: DragStartEvent) => {
    if (active.data.current?.type !== 'column') return

    snapshotRef.current = columnsRef.current

    setActiveColumn(active.data.current.column)
  }

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveColumn(null)

    snapshotRef.current = null

    if (!over || active.data.current?.type !== 'column') return

    const columns = columnsRef.current

    const activeIndex = columns.findIndex(column => column.id === active.id)
    const overIndex = columns.findIndex(column => column.id === over.id)

    if (activeIndex === -1 || overIndex === -1) return

    if (activeIndex === overIndex) return

    const updatedColumns = arrayMove(columns, activeIndex, overIndex)

    applyColumns(() => updatedColumns)

    updateColumnOrder({ columns: updatedColumns })
  }

  const onDragCancel = () => {
    setActiveColumn(null)

    const snapshot = snapshotRef.current

    snapshotRef.current = null

    if (snapshot) applyColumns(() => snapshot)
  }

  return { onDragStart, onDragEnd, onDragCancel }
}
