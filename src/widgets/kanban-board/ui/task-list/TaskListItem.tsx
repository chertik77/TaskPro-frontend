import type { TaskTypes } from '@/entities/task'
import type { KeyboardEvent } from 'react'

import { useState } from 'react'

import { cn, useDndSortable } from '@/shared/lib'

import { MemoizedTask } from './MemoizedTask'

type TaskListItemProps = {
  task: TaskTypes.TaskSchema
  isOverlay?: boolean
}

export const TaskListItem = ({ task, isOverlay }: TaskListItemProps) => {
  const [isInteracting, setIsInteracting] = useState(false)

  const { setNodeRef, listeners, attributes, style, isDragging } =
    useDndSortable({
      id: task.id,
      data: { type: 'task', task },
      attributes: { roleDescription: `Task: ${task.title}` },
      disabled: isInteracting
    })

  // Prevents dnd kit to trigger keyboard navigation during child interaction
  const handleKeyDownCapture = (e: KeyboardEvent) => {
    const nativeEvent = e.nativeEvent as KeyboardEvent['nativeEvent'] & {
      dndKit?: unknown
    }

    if (!nativeEvent?.dndKit) setIsInteracting(true)
  }

  return (
    <li
      className={cn(
        `disable-text-selection cursor-grab touch-manipulation list-none
        rounded-lg transition-shadow focus-visible:outline-none
        focus-visible:[&>div]:shadow-[inset_0_0px_10px_#9dc888]`,
        isOverlay && 'styled-outline',
        isDragging && 'opacity-60'
      )}
      onKeyDownCapture={handleKeyDownCapture}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}>
      <MemoizedTask task={task} />
    </li>
  )
}
