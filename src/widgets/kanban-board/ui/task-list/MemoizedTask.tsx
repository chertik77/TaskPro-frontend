import type { Task as TTask } from '@/shared/api'

import { memo } from 'react'

import { DeleteColumnAlertDialog } from '@/features/task/delete'
import { EditTaskDialog } from '@/features/task/edit'
import { MoveTaskSelect } from '@/features/task/move'

import { Task, useCardDensity } from '@/entities/task'

import { cn } from '@/shared/lib'

import { useCompleteTask } from '../../api/useCompleteTask'

type MemoizedTaskProps = {
  task: TTask
}

export const MemoizedTask = memo(({ task }: MemoizedTaskProps) => {
  const { mutate: completeTask, isPending } = useCompleteTask()

  const isCompact = useCardDensity() === 'compact'

  return (
    <Task
      task={task}
      className='flex flex-col'>
      <Task.PriorityIndicator />
      <div className={cn('mb-1 flex gap-2', isCompact ? 'mb-2' : 'mb-1')}>
        <Task.CompletedToggle
          disabled={isPending}
          onCheckedChange={v => completeTask({ taskId: task.id, completed: v })}
        />
        <div className='flex flex-col'>
          <Task.Title />
        </div>
      </div>
      <Task.Labels
        className={cn(!task.description && (isCompact ? 'mb-2' : 'mb-3.5'))}
      />
      <Task.Description />
      <div
        className={cn(
          'mt-auto flex',
          isCompact
            ? 'items-center'
            : 'items-end border-t border-black/10 pt-3.5 dark:border-white/10'
        )}>
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
            <DeleteColumnAlertDialog taskId={task.id} />
          </div>
        </div>
      </div>
    </Task>
  )
})
