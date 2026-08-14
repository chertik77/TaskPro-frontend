import type { Column, Task } from '@/shared/api'

import { memo } from 'react'

import { cn } from '@/shared/lib'

import { useDndSortable } from '../../lib/useDndSortable'
import { MemoizedTask } from './MemoizedTask'

type TaskListItemProps = {
  task: Task
  columns: Column[]
  onCompletedChange: (taskId: string, completed: boolean) => void
}

export const TaskListItem = memo(
  ({ task, columns, onCompletedChange }: TaskListItemProps) => {
    const { setNodeRef, listeners, attributes, style, isDragging } =
      useDndSortable({
        id: task.id,
        data: { type: 'task', task },
        attributes: { roleDescription: `Task: ${task.title}` }
      })

    return (
      <li
        className={cn(
          `disable-text-selection cursor-grab touch-manipulation list-none
          rounded-lg focus-visible:outline-none
          focus-visible:[&>div]:shadow-[inset_0_0px_10px_#9dc888]`,
          isDragging && 'opacity-60'
        )}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}>
        <MemoizedTask
          task={task}
          columns={columns}
          onCompletedChange={onCompletedChange}
        />
      </li>
    )
  }
)
