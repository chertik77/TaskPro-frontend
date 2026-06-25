import type { TaskTypes } from '@/entities/task'

import { useMemo } from 'react'
import { SortableContext } from '@dnd-kit/sortable'

import { useFilteredTasks } from '@/features/task/filter-tasks'

import { TaskListItem } from './TaskListItem'

type TaskListProps = {
  tasks: TaskTypes.TasksSchema | undefined
}

export const TaskList = ({ tasks }: TaskListProps) => {
  const tasksIds = useMemo(() => tasks?.map(c => c.id), [tasks])

  const filteredTasks = useFilteredTasks(tasks || [])

  return (
    <SortableContext items={tasksIds || []}>
      {filteredTasks?.length > 0 && (
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
