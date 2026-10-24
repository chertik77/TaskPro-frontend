import type { Column } from '@/shared/api'
import type { Ref } from 'react'

import { memo, useMemo } from 'react'
import { cn } from 'cn'
import { useIsPresent } from 'motion/react'
import * as m from 'motion/react-m'

import { mergeRefs } from '@/shared/lib'

import { columnVariants, itemExit } from '../../config/animations'
import { useDndSortable } from '../../lib/useDndSortable'
import { MemoizedColumn } from './MemoizedColumn'

type ColumnListItemProps = {
  column: Column
  backgroundURL?: string | null
  ref?: Ref<HTMLLIElement>
}

export const ColumnListItem = memo(
  ({ column, backgroundURL, ref }: ColumnListItemProps) => {
    const isPresent = useIsPresent()

    const { setNodeRef, listeners, attributes, style, isDragging } =
      useDndSortable({
        id: column.id,
        data: { type: 'column', column },
        attributes: { roleDescription: `Column: ${column.title}` },
        disabled: !isPresent
      })

    const mergedRef = useMemo(
      () => mergeRefs(setNodeRef, ref),
      [setNodeRef, ref]
    )

    return (
      <li
        className={cn(
          'w-83.5 touch-manipulation list-none rounded-lg',
          isDragging && 'opacity-60 select-none'
        )}
        ref={mergedRef}
        style={style}>
        <m.div
          data-flip-id={column.id}
          variants={columnVariants}
          exit={itemExit}>
          <MemoizedColumn
            column={column}
            backgroundURL={backgroundURL}
            draggableAttributes={attributes}
            draggableListeners={listeners}
          />
        </m.div>
      </li>
    )
  }
)
