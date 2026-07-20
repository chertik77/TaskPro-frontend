import type { Column as TColumn } from '@/shared/api'
import type {
  DraggableAttributes,
  DraggableSyntheticListeners
} from '@dnd-kit/core'

import { memo } from 'react'

import { DeleteColumnAlertDialog } from '@/features/column/delete'
import { EditColumnDialog } from '@/features/column/edit'
import { useDragAndDropSelector } from '@/features/drag-and-drop'
import { AddTaskDialog } from '@/features/task/add'

import { Column } from '@/entities/column'

import { cn } from '@/shared/lib'

import { TaskList } from '../task-list/TaskList'

type MemoizedColumnProps = {
  column: TColumn
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
    const tasks = useDragAndDropSelector(ctx =>
      ctx.tasks?.filter(c => c.columnId === column.id)
    )

    return (
      <Column column={column}>
        <Column.Header
          className='mb-3.5 flex items-center justify-between gap-4'>
          <div className='flex max-w-47.5 items-center gap-3'>
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
            <DeleteColumnAlertDialog columnId={column.id} />
          </div>
        </Column.Header>
        <Column.ScrollArea>
          <Column.ScrollAreaViewport>
            <Column.ScrollAreaContent className='w-full'>
              <TaskList tasks={tasks} />
            </Column.ScrollAreaContent>
          </Column.ScrollAreaViewport>
          <Column.ScrollAreaScrollbar>
            <Column.ScrollAreaThumb
              className={cn(
                !backgroundURL && 'bg-gray-light w-2! dark:bg-white/10'
              )}
            />
          </Column.ScrollAreaScrollbar>
        </Column.ScrollArea>
        <AddTaskDialog columnId={column.id} />
      </Column>
    )
  }
)
