import type { Announcements } from '@dnd-kit/core'
import type { DragAndDropContext } from '../model/types'

import { useRef } from 'react'

import { getDraggingTaskData } from '../lib/getDraggingTaskData'

export const useGetAccessibilityAnnouncements = ({
  columns,
  tasks
}: Pick<DragAndDropContext, 'columns' | 'tasks'>): Announcements => {
  const activeColumnTaskIdRef = useRef<string | null>(null)

  return {
    onDragStart({ active }) {
      if (!active) return

      if (active.data.current?.type === 'column') {
        const activeColumnIdx = columns.findIndex(c => c.id === active.id)
        const activeColumn = columns[activeColumnIdx]

        return `Picked up column ${activeColumn.title} at position: ${
          activeColumnIdx + 1
        } of ${columns.length}`
      } else if (active.data.current?.type === 'task') {
        activeColumnTaskIdRef.current = active.data.current.task.columnId

        const { columnTasks, taskPosition, column } = getDraggingTaskData(
          active.id,
          activeColumnTaskIdRef.current,
          columns,
          tasks
        )

        return `Picked up task ${
          active.data.current.task.title
        } at position: ${taskPosition + 1} of ${
          columnTasks.length
        } in column ${column?.title}`
      }
    },
    onDragOver({ active, over }) {
      if (!active || !over) return

      if (
        active.data.current?.type === 'column' &&
        over.data.current?.type === 'column'
      ) {
        const overColumnIdx = columns.findIndex(c => c.id === over.id)

        return `Column ${active.data.current.column.title} was moved over ${
          over.data.current.column.title
        } at position ${overColumnIdx + 1} of ${columns.length}`
      } else if (
        active.data.current?.type === 'task' &&
        over.data.current?.type === 'task'
      ) {
        const { columnTasks, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.columnId,
          columns,
          tasks
        )

        if (over.data.current.task.columnId !== activeColumnTaskIdRef.current) {
          return `Task ${
            active.data.current.task.title
          } was moved over column ${column?.title} in position ${
            taskPosition + 1
          } of ${columnTasks.length}`
        }

        return `Task was moved over position ${taskPosition + 1} of ${
          columnTasks.length
        } in column ${column?.title}`
      }
    },
    onDragEnd({ active, over }) {
      if (!active || !over) {
        activeColumnTaskIdRef.current = null

        return
      }

      if (
        active.data.current?.type === 'column' &&
        over.data.current?.type === 'column'
      ) {
        const overColumnPosition = columns.findIndex(c => c.id === over.id)

        return `Column ${
          active.data.current.column.title
        } was dropped into position ${overColumnPosition + 1} of ${
          columns.length
        }`
      } else if (
        active.data.current?.type === 'task' &&
        over.data.current?.type === 'task'
      ) {
        const { columnTasks, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.columnId,
          columns,
          tasks
        )

        if (over.data.current.task.columnId !== activeColumnTaskIdRef.current) {
          return `Task was dropped into column ${column?.title} in position ${
            taskPosition + 1
          } of ${columnTasks.length}`
        }

        return `Task was dropped into position ${taskPosition + 1} of ${
          columnTasks.length
        } in column ${column?.title}`
      }

      activeColumnTaskIdRef.current = null
    },
    onDragCancel({ active }) {
      activeColumnTaskIdRef.current = null

      if (!active) return

      return `Dragging ${active.data.current?.type} cancelled.`
    }
  }
}
