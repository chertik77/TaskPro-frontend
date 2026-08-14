import type { Column, Task } from '@/shared/api'

import { useCallback, useMemo } from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { useFilteredTasks } from '@/features/task/filter'

import { useCompleteTask } from '../../api/useCompleteTask'
import { MemoizedTask } from './MemoizedTask'
import { TaskListItem } from './TaskListItem'

type TaskListProps = {
  tasks: Task[] | undefined
  columns: Column[]
  isOverlay?: boolean
}

const EMPTY_TASKS: Task[] = []

export const TaskList = ({ tasks, columns, isOverlay }: TaskListProps) => {
  const filteredTasks = useFilteredTasks(tasks ?? EMPTY_TASKS)

  const tasksIds = useMemo(() => filteredTasks.map(c => c.id), [filteredTasks])

  const { mutate: completeTask } = useCompleteTask()

  const onCompletedChange = useCallback(
    (taskId: string, completed: boolean) => completeTask({ taskId, completed }),
    [completeTask]
  )

  if (!filteredTasks.length) return null

  if (isOverlay) {
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
      <ul className='space-y-2'>
        {filteredTasks.map(task => (
          <TaskListItem
            key={task.id}
            task={task}
            columns={columns}
            onCompletedChange={onCompletedChange}
          />
        ))}
      </ul>
    </SortableContext>
  )
}
