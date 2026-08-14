import type { Task } from '@/shared/api'
import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import type { TaskDragHandlersProps } from './types'

import { useRef } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

import { useMoveDraggedTask } from '../api/useMoveDraggedTask'

const getColumnTasks = (tasks: Task[], columnId: string) =>
  tasks.filter(task => task.columnId === columnId)

const getPosition = (tasks: Task[], taskId: string, columnId: string) =>
  getColumnTasks(tasks, columnId).findIndex(task => task.id === taskId)

export const useTaskDragHandlers = ({
  applyTasks,
  tasksRef,
  setActiveTask
}: TaskDragHandlersProps) => {
  const { mutate: moveTask } = useMoveDraggedTask()

  const snapshotRef = useRef<Task[] | null>(null)

  const onDragStart = ({ active }: DragStartEvent) => {
    if (active.data.current?.type !== 'task') return

    snapshotRef.current = tasksRef.current

    setActiveTask(active.data.current.task)
  }

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over || active.data.current?.type !== 'task') return

    if (active.id === over.id) return

    applyTasks(prev => {
      const activeIndex = prev.findIndex(task => task.id === active.id)

      if (activeIndex === -1) return prev

      const activeTask = prev[activeIndex]

      if (!activeTask) return prev

      const overIsTask = over.data.current?.type === 'task'

      const overColumnId = overIsTask
        ? prev.find(task => task.id === over.id)?.columnId
        : String(over.id)

      if (!overColumnId) return prev

      // Reordering inside one column is previewed by the sorting strategy and
      // committed on drop. Writing state here would move the card, re-run
      // collision detection against the new layout, and move it straight back.
      if (activeTask.columnId === overColumnId) return prev

      let overIndex: number

      if (overIsTask) {
        overIndex = prev.findIndex(task => task.id === over.id)

        if (overIndex === -1) return prev

        const translated = active.rect.current.translated

        const isBelow =
          !!translated &&
          translated.top + translated.height / 2 >
            over.rect.top + over.rect.height / 2

        if (isBelow) overIndex += 1
      } else {
        let lastIndex = -1

        prev.forEach((task, index) => {
          if (task.columnId === overColumnId) lastIndex = index
        })

        overIndex = lastIndex === -1 ? prev.length : lastIndex + 1
      }

      const insertAt = activeIndex < overIndex ? overIndex - 1 : overIndex

      const next = [...prev]

      next.splice(activeIndex, 1)

      next.splice(insertAt, 0, { ...activeTask, columnId: overColumnId })

      return next
    })
  }

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTask(null)

    const snapshot = snapshotRef.current

    snapshotRef.current = null

    if (active.data.current?.type !== 'task') return

    if (over) {
      applyTasks(prev => {
        const activeIndex = prev.findIndex(item => item.id === active.id)
        const overIndex = prev.findIndex(item => item.id === over.id)

        if (activeIndex === -1 || overIndex === -1) return prev

        if (activeIndex === overIndex) return prev

        const activeTask = prev[activeIndex]
        const overTask = prev[overIndex]

        if (!activeTask || !overTask) return prev

        if (activeTask.columnId !== overTask.columnId) return prev

        return arrayMove(prev, activeIndex, overIndex)
      })
    }

    const tasks = tasksRef.current

    const task = tasks.find(item => item.id === active.id)

    if (!task) return

    const columnTasks = getColumnTasks(tasks, task.columnId)

    const position = columnTasks.findIndex(item => item.id === task.id)

    if (snapshot) {
      const previous = snapshot.find(item => item.id === task.id)

      const isUnchanged =
        previous?.columnId === task.columnId &&
        getPosition(snapshot, task.id, task.columnId) === position

      if (isUnchanged) return
    }

    moveTask({
      taskId: task.id,
      columnId: task.columnId,
      prevTaskId: columnTasks[position - 1]?.id,
      nextTaskId: columnTasks[position + 1]?.id,
      tasks
    })
  }

  const onDragCancel = () => {
    setActiveTask(null)

    const snapshot = snapshotRef.current

    snapshotRef.current = null

    if (snapshot) applyTasks(() => snapshot)
  }

  return { onDragStart, onDragOver, onDragEnd, onDragCancel }
}
