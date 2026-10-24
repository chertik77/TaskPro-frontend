import { useMemo, useRef } from 'react'
import {
  horizontalListSortingStrategy,
  SortableContext
} from '@dnd-kit/sortable'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'

import { AddColumnDialog } from '@/features/column/add'
import { useDragAndDropSelector } from '@/features/drag-and-drop'

import { columnListVariants, columnVariants } from '../../config/animations'
import { FlipGroup } from '../../lib/FlipGroup'
import { ColumnListItem } from './ColumnListItem'

type ColumnListProps = {
  backgroundURL: string | null | undefined
}

export const ColumnList = ({ backgroundURL }: ColumnListProps) => {
  const columns = useDragAndDropSelector(ctx => ctx.columns)

  const isDndActive = useDragAndDropSelector(
    ctx => !!(ctx.activeTask || ctx.activeColumn)
  )

  const columnsIds = useMemo(() => columns?.map(c => c.id), [columns])

  const listRef = useRef<HTMLUListElement>(null)

  return (
    <SortableContext
      items={columnsIds || []}
      strategy={horizontalListSortingStrategy}>
      <FlipGroup
        containerRef={listRef}
        disabled={isDndActive}>
        <m.ul
          ref={listRef}
          variants={columnListVariants}
          initial='hidden'
          animate='show'
          className='desktop:pl-6 tablet:pl-8 relative flex gap-8.5 pl-5'>
          <AnimatePresence mode='popLayout'>
            {columns?.map(column => (
              <ColumnListItem
                column={column}
                key={column.id}
                backgroundURL={backgroundURL}
              />
            ))}
          </AnimatePresence>
          <m.li
            data-flip-id='add-column'
            variants={columnVariants}>
            <AddColumnDialog />
          </m.li>
        </m.ul>
      </FlipGroup>
    </SortableContext>
  )
}
