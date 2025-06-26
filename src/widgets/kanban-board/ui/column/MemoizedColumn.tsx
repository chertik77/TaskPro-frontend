import type { ColumnTypes } from '@/entities/column'
import type {
  DraggableAttributes,
  DraggableSyntheticListeners
} from '@dnd-kit/core'

import { memo } from 'react'

import { AddCardDialog } from '@/features/card/add-card'
import { DeleteColumnTrigger } from '@/features/column/delete-column'
import { EditColumnDialog } from '@/features/column/edit-column'
import { useDragAndDrop } from '@/features/drag-and-drop'

import { Column } from '@/entities/column'

import { cn } from '@/shared/lib'

import { CardList } from '../card/CardList'

type MemoizedColumnProps = {
  column: ColumnTypes.ColumnSchema
  backgroundURL?: string | null
  draggableAttributes: DraggableAttributes
  draggableListeners: DraggableSyntheticListeners
}

export const MemoizedColumn = memo(
  ({
    column,
    backgroundURL,
    draggableAttributes,
    draggableListeners
  }: MemoizedColumnProps) => {
    const { cards } = useDragAndDrop()

    return (
      <Column column={column}>
        <Column.Header className='mb-3.5 flex items-center justify-between gap-4'>
          <div className='flex max-w-[190px] items-center gap-3'>
            <Column.DragActivator
              className='shrink-0'
              {...draggableAttributes}
              {...draggableListeners}
            />
            <Column.Title />
          </div>
          <div>
            <EditColumnDialog
              data={{ columnId: column.id, formValues: column }}
            />
            <DeleteColumnTrigger columnId={column.id} />
          </div>
        </Column.Header>
        <Column.ScrollArea>
          <Column.ScrollAreaViewport>
            <CardList cards={cards?.filter(c => c.columnId === column.id)} />
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
    )
  }
)
