import type { Task } from '@/shared/api'

import { useMemo } from 'react'
import { SortableContext } from '@dnd-kit/sortable'

import { useFilteredTasks } from '@/features/task/filter'

import { TaskListItem } from './TaskListItem'

type TaskListProps = {
  tasks: Task[] | undefined
}

export const TaskList = ({ tasks }: TaskListProps) => {
  const filteredTasks = useFilteredTasks(tasks || [])

  const tasksIds = useMemo(() => filteredTasks.map(c => c.id), [filteredTasks])

  return (
    <SortableContext items={tasksIds}>
      {filteredTasks.length > 0 && (
        <ul className='space-y-2'>
          {filteredTasks.map(task => (
            <TaskListItem
              key={task.id}
              task={task}
            />
          ))}
        </ul>
      )}
    </SortableContext>
  )
}
