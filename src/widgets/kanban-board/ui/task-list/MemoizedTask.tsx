import type { TaskTypes } from '@/entities/task'

import { memo } from 'react'

import { AddLabelDialog } from '@/features/label/add'
import { DeleteTaskTrigger } from '@/features/task/delete'
import { EditTaskDialog } from '@/features/task/edit'
import { MoveTaskSelect } from '@/features/task/move'

import { Task } from '@/entities/task'

import { cn } from '@/shared/lib'

import { useCompleteTask } from '../../api/useCompleteTask'

type MemoizedTaskProps = {
  task: TaskTypes.TaskSchema
}

export const MemoizedTask = memo(({ task }: MemoizedTaskProps) => {
  const { mutate: completeTask, isPending } = useCompleteTask()

  return (
    <>
      <Task
        task={task}
        className='flex flex-col'>
        <Task.PriorityIndicator />
        <div className='mb-1 flex gap-2'>
          <Task.CompletedToggle
            disabled={isPending}
            className='cursor-pointer'
            onCheckedChange={v =>
              completeTask({ taskId: task.id, completed: v })
            }
          />
          <div className='flex flex-col'>
            <Task.Title />
          </div>
        </div>
        <Task.Labels className={cn(!task.description && 'mb-3.5')} />
        <Task.Description />
        <div
          className='mt-auto flex items-end border-t border-black/10 pt-3.5
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
      <AddLabelDialog />
    </>
  )
})
