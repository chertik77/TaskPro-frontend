import type { ColumnTypes } from '@/entities/column'

import { cn, useDndSortable } from '@/shared/lib'

import { MemoizedColumn } from './MemoizedColumn'

type ColumnListItemProps = {
  column: ColumnTypes.ColumnSchema
  isOverlay?: boolean
  backgroundURL?: string | null
}

export const ColumnListItem = ({
  column,
  isOverlay,
  backgroundURL
}: ColumnListItemProps) => {
  const { setNodeRef, listeners, attributes, style, isDragging } =
    useDndSortable({
      id: column.id,
      data: { type: 'column', column },
      attributes: { roleDescription: `Column: ${column.title}` }
    })

  return (
    <li
      className={cn(
        'w-[334px] touch-manipulation list-none rounded-lg',
        isOverlay && 'styled-outline',
        isDragging && 'opacity-60 select-none'
      )}
      ref={setNodeRef}
      style={style}>
      <MemoizedColumn
        column={column}
        backgroundURL={backgroundURL}
        draggableAttributes={attributes}
        draggableListeners={listeners}
      />
    </li>
  )
}
