import { DragOverlay } from '@dnd-kit/core'
import { createPortal } from 'react-dom'

import { useDragAndDropSelector } from '@/features/drag-and-drop'

import { MemoizedColumn } from './column-list/MemoizedColumn'
import { MemoizedTask } from './task-list/MemoizedTask'

const noop = () => {}

export const KanbanDragOverlay = () => {
  const activeColumn = useDragAndDropSelector(ctx => ctx.activeColumn)
  const activeTask = useDragAndDropSelector(ctx => ctx.activeTask)
  const columns = useDragAndDropSelector(ctx => ctx.columns)

  return createPortal(
    <DragOverlay>
      {activeColumn && (
        <div className='styled-outline w-83.5 list-none rounded-lg'>
          <MemoizedColumn
            column={activeColumn}
            isOverlay
          />
        </div>
      )}
      {activeTask && (
        <div className='styled-outline cursor-grabbing rounded-lg'>
          <MemoizedTask
            task={activeTask}
            columns={columns}
            onCompletedChange={noop}
          />
        </div>
      )}
    </DragOverlay>,
    document.body
  )
}
