import type { ColumnTypes } from '@/entities/column'

import { AddCardDialog } from '@/features/card/add-card'
import { DeleteColumnTrigger } from '@/features/column/delete-column'
import { EditColumnDialog } from '@/features/column/edit-column'

import { Column } from '@/entities/column'

import { useKanbanSortable } from '@/shared/hooks'
import { cn } from '@/shared/lib/cn'

import { CardList } from '../card/CardList'

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
    useKanbanSortable({
      id: column.id,
      data: { type: 'column', column },
      attributes: { roleDescription: `Column: ${column.title}` }
    })

  return (
    <li
      className={cn(
        'w-[334px] list-none rounded-lg',
        isOverlay && 'styled-outline select-none',
        isDragging && 'opacity-60 select-none'
      )}
      ref={setNodeRef}
      style={style}>
      <Column column={column}>
        <Column.Header>
          <div className='flex max-w-[190px] items-center gap-3'>
            <Column.DragActivator
              className='shrink-0'
              listeners={listeners}
              attributes={attributes}
            />
            <Column.Title />
          </div>
          <div>
            <EditColumnDialog data={{ id: column.id, title: column.title }} />
            <DeleteColumnTrigger columnId={column.id} />
          </div>
        </Column.Header>
        <Column.ScrollArea>
          <Column.ScrollAreaViewport>
            <CardList currentColumnId={column.id} />
          </Column.ScrollAreaViewport>
          <Column.ScrollAreaScrollbar>
            <Column.ScrollAreaThumb
              className={cn(
                !backgroundURL &&
                  'bg-gray-light violet:bg-black/20 !w-2 dark:bg-white/10'
              )}
            />
          </Column.ScrollAreaScrollbar>
        </Column.ScrollArea>
        <AddCardDialog columnId={column.id} />
      </Column>
    </li>
  )
}
