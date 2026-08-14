import type { Column } from '@/shared/api'

import { memo } from 'react'

import { cn } from '@/shared/lib'

import { useDndSortable } from '../../lib/useDndSortable'
import { MemoizedColumn } from './MemoizedColumn'

type ColumnListItemProps = {
  column: Column
  backgroundURL?: string | null
}

export const ColumnListItem = memo(
  ({ column, backgroundURL }: ColumnListItemProps) => {
    const { setNodeRef, listeners, attributes, style, isDragging } =
      useDndSortable({
        id: column.id,
        data: { type: 'column', column },
        attributes: { roleDescription: `Column: ${column.title}` }
      })

    return (
      <li
        className={cn(
          'w-83.5 touch-manipulation list-none rounded-lg',
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
)
