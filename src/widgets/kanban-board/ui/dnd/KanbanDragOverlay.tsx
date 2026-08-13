import { DragOverlay } from '@dnd-kit/core'
import { createPortal } from 'react-dom'

import { useDragAndDropSelector } from '@/features/drag-and-drop'

import { ColumnListItem } from '../column-list/ColumnListItem'
import { TaskListItem } from '../task-list/TaskListItem'

export const KanbanDragOverlay = () => {
  const activeColumn = useDragAndDropSelector(ctx => ctx.activeColumn)
  const activeTask = useDragAndDropSelector(ctx => ctx.activeTask)

  return createPortal(
    <DragOverlay>
      {activeColumn && (
        <ColumnListItem
          column={activeColumn}
          isOverlay
        />
      )}
      {activeTask && (
        <TaskListItem
          task={activeTask}
          isOverlay
        />
      )}
    </DragOverlay>,
    document.body
  )
}
