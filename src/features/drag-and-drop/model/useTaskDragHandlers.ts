import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier
} from '@dnd-kit/core'
import type { TaskDragHandlersProps } from './types'

import { useRef } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

import { useUpdateTaskOrder } from '../api/useUpdateTaskOrder'

export const useTaskDragHandlers = ({
  tasks,
  setTasks,
  setActiveTask
}: TaskDragHandlersProps) => {
  const { mutate: updateTaskOrder } = useUpdateTaskOrder()

  const recentlyDraggedOverIdRef = useRef<UniqueIdentifier | null>(null)

  const onDragStart = ({ active }: DragStartEvent) => {
    if (!active || active.data.current?.type !== 'task') return

    setActiveTask(active.data.current.task)
  }

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over || active.id === over.id) return

    if (recentlyDraggedOverIdRef.current === over.id) return

    const isActiveATask = active.data.current?.type === 'task'
    const isDraggingOverATask = over.data.current?.type === 'task'
    const isDraggingOverAColumn = over.data.current?.type === 'column'

    if (!isActiveATask) return

    recentlyDraggedOverIdRef.current = over.id

    if (isDraggingOverATask) {
      setTasks(prevTasks => {
        const activeTaskIndex = prevTasks.findIndex(c => c.id === active.id)
        const overTaskIndex = prevTasks.findIndex(c => c.id === over.id)

        const activeTask = prevTasks[activeTaskIndex]
        const overTask = prevTasks[overTaskIndex]

        if (!activeTask || !overTask) return prevTasks

        if (activeTask.columnId !== overTask.columnId) {
          activeTask.columnId = overTask.columnId

          return arrayMove(
            prevTasks,
            activeTaskIndex,
            Math.max(0, overTaskIndex - 1)
          )
        }

        return arrayMove(prevTasks, activeTaskIndex, overTaskIndex)
      })
    }

    if (isDraggingOverAColumn) {
      setTasks(prevTasks => {
        const activeTaskIndex = prevTasks.findIndex(c => c.id === active.id)
        const activeTask = prevTasks[activeTaskIndex]

        recentlyDraggedOverIdRef.current = over.id

        if (activeTask) {
          activeTask.columnId = over.id as string

          return arrayMove(prevTasks, activeTaskIndex, activeTaskIndex)
        }

        return prevTasks
      })
    }
  }

  const onDragEnd = ({ active }: DragEndEvent) => {
    setActiveTask(null)

    const draggedOverId = recentlyDraggedOverIdRef.current
    recentlyDraggedOverIdRef.current = null

    if (!active || active.data.current?.type !== 'task' || !draggedOverId) {
      return
    }

    const activeTask = tasks.find(c => c.id === active.id)

    if (activeTask) {
      updateTaskOrder({
        path: { columnId: activeTask.columnId },
        body: {
          ids: tasks
            .filter(c => c.columnId === activeTask.columnId)
            .map(c => c.id)
        }
      })
    }
  }

  return { onDragStart, onDragOver, onDragEnd }
}
