import type { ColumnTypes } from '@/entities/column'
import type { DraggableAttributes } from '@dnd-kit/core'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'

import { memo } from 'react'

import { AddCardDialog } from '@/features/card/add-card'
import { DeleteColumnTrigger } from '@/features/column/delete-column'
import { EditColumnDialog } from '@/features/column/edit-column'
import { useDragAndDrop } from '@/features/drag-and-drop'

import { Column } from '@/entities/column'

import { cn } from '@/shared/lib/cn'

import { CardList } from '../card/CardList'

type MemoizedColumnProps = {
  column: ColumnTypes.ColumnSchema
  attributes: DraggableAttributes
  listeners: SyntheticListenerMap | undefined
  backgroundURL?: string | null
}

export const MemoizedColumn = memo(
  ({ column, backgroundURL, attributes, listeners }: MemoizedColumnProps) => {
    const { cards } = useDragAndDrop()

    return (
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
            <EditColumnDialog
              data={{ columnId: column.id, title: column.title }}
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
