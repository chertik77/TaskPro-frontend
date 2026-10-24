import type { Column, Task } from '@/shared/api'

import { useCallback, useMemo, useRef } from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'

import { useDragAndDropSelector } from '@/features/drag-and-drop'
import { useFilteredTasks } from '@/features/task/filter'

import { useCompleteTask } from '../../api/useCompleteTask'
import { taskListVariants } from '../../config/animations'
import { FlipGroup } from '../../lib/FlipGroup'
import { MemoizedTask } from './MemoizedTask'
import { TaskListItem } from './TaskListItem'

type TaskListProps = {
  tasks: Task[] | undefined
  columns: Column[]
  isOverlay?: boolean
}

export const TaskList = ({ tasks, columns, isOverlay }: TaskListProps) => {
  const filteredTasks = useFilteredTasks(tasks ?? [])

  const tasksIds = useMemo(() => filteredTasks.map(c => c.id), [filteredTasks])

  const isDndActive = useDragAndDropSelector(
    ctx => !!(ctx.activeTask || ctx.activeColumn)
  )

  const listRef = useRef<HTMLUListElement>(null)

  const { mutate: completeTask } = useCompleteTask()

  const onCompletedChange = useCallback(
    (taskId: string, completed: boolean) => completeTask({ taskId, completed }),
    [completeTask]
  )

  if (isOverlay) {
    if (!filteredTasks.length) return null

    return (
      <ul className='space-y-2'>
        {filteredTasks.map(task => (
          <li
            key={task.id}
            className='list-none rounded-lg'>
            <MemoizedTask
              task={task}
              columns={columns}
              onCompletedChange={onCompletedChange}
            />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <SortableContext
      items={tasksIds}
      strategy={verticalListSortingStrategy}>
      <FlipGroup
        containerRef={listRef}
        disabled={isDndActive}>
        <m.ul
          ref={listRef}
          variants={taskListVariants}
          className='relative flex flex-col gap-2'>
          <AnimatePresence mode='popLayout'>
            {filteredTasks.map(task => (
              <TaskListItem
                key={task.id}
                task={task}
                columns={columns}
                onCompletedChange={onCompletedChange}
              />
            ))}
          </AnimatePresence>
        </m.ul>
      </FlipGroup>
    </SortableContext>
  )
}
