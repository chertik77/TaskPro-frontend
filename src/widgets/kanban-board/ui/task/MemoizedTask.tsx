import type { TaskTypes } from '@/entities/task'

import { memo } from 'react'

import { DeleteTaskTrigger } from '@/features/task/delete-task'
import { EditTaskDialog } from '@/features/task/edit-task'
import { MoveTaskSelect } from '@/features/task/move-task'

import { Task } from '@/entities/task'

type MemoizedTaskProps = {
  task: TaskTypes.TaskSchema
}

export const MemoizedTask = memo(({ task }: MemoizedTaskProps) => (
  <Task task={task}>
    <Task.PriorityIndicator />
    <Task.Title />
    <Task.Description />
    <div
      className='flex items-end border-t border-black/10 pt-3.5
        dark:border-white/10'>
      <Task.Priority />
      <Task.Deadline />
      <div className='ml-auto flex items-center gap-3'>
        <Task.DeadlineTodayIndicator />
        <div className='flex items-center gap-2'>
          <MoveTaskSelect
            taskId={task.id}
            taskColumnId={task.columnId}
          />
          <EditTaskDialog data={{ taskId: task.id, formValues: task }} />
          <DeleteTaskTrigger taskId={task.id} />
        </div>
      </div>
    </div>
  </Task>
))
