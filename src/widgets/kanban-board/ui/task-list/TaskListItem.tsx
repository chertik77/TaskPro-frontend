import type { Column, Task } from '@/shared/api'
import type { Ref } from 'react'

import { memo, useMemo } from 'react'
import { cn } from 'cn'
import { useIsPresent } from 'motion/react'
import * as m from 'motion/react-m'

import { mergeRefs } from '@/shared/lib'

import { itemExit, taskVariants } from '../../config/animations'
import { useDndSortable } from '../../lib/useDndSortable'
import { MemoizedTask } from './MemoizedTask'

type TaskListItemProps = {
  task: Task
  columns: Column[]
  onCompletedChange: (taskId: string, completed: boolean) => void
  ref?: Ref<HTMLLIElement>
}

export const TaskListItem = memo(
  ({ task, columns, onCompletedChange, ref }: TaskListItemProps) => {
    const isPresent = useIsPresent()

    const { setNodeRef, listeners, attributes, style, isDragging, active } =
      useDndSortable({
        id: task.id,
        data: { type: 'task', task },
        attributes: { roleDescription: `Task: ${task.title}` },
        disabled: !isPresent
      })

    const mergedRef = useMemo(
      () => mergeRefs(setNodeRef, ref),
      [setNodeRef, ref]
    )

    const isDndActive = active !== null

    return (
      <li
        className={cn(
          `disable-text-selection cursor-grab touch-manipulation list-none
          rounded-lg focus-visible:outline-none
          focus-visible:[&>div>div]:shadow-[inset_0_0px_10px_#9dc888]`,
          isDragging && 'opacity-60'
        )}
        ref={mergedRef}
        style={style}
        {...listeners}
        {...attributes}>
        <m.div
          data-flip-id={task.id}
          variants={taskVariants}
          initial={isDndActive ? false : undefined}
          exit={isDndActive ? undefined : itemExit}>
          <MemoizedTask
            task={task}
            columns={columns}
            onCompletedChange={onCompletedChange}
          />
        </m.div>
      </li>
    )
  }
)
