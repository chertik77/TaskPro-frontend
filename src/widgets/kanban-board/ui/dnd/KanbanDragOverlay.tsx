import { DragOverlay } from '@dnd-kit/core'
import { createPortal } from 'react-dom'

import { useDragAndDrop } from '@/features/drag-and-drop'

import { ColumnListItem } from '../column-list/ColumnListItem'
import { TaskListItem } from '../task-list/TaskListItem'

export const KanbanDragOverlay = () => {
  const { activeTask, activeColumn } = useDragAndDrop()

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
