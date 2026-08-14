import type { Column, Task as TTask } from '@/shared/api'
import type { KeyboardEvent, PointerEvent } from 'react'

import { memo } from 'react'

import { DeleteColumnAlertDialog } from '@/features/task/delete'
import { EditTaskDialog } from '@/features/task/edit'
import { MoveTaskSelect } from '@/features/task/move'

import { Task, useCardDensity } from '@/entities/task'

import { cn } from '@/shared/lib'

type MemoizedTaskProps = {
  task: TTask
  columns: Column[]
  onCompletedChange: (taskId: string, completed: boolean) => void
}

const stopDragActivation = {
  onPointerDown: (e: PointerEvent) => e.stopPropagation(),
  onKeyDown: (e: KeyboardEvent) => e.stopPropagation()
}

export const MemoizedTask = memo(
  ({ task, columns, onCompletedChange }: MemoizedTaskProps) => {
    const isCompact = useCardDensity() === 'compact'

    return (
      <Task
        task={task}
        className='flex flex-col'>
        <Task.PriorityIndicator />
        <div className={cn('mb-1 flex gap-2', isCompact ? 'mb-2' : 'mb-1')}>
          <span {...stopDragActivation}>
            <Task.CompletedToggle
              onCheckedChange={v => onCompletedChange(task.id, !!v)}
            />
          </span>
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
            <div
              className='flex items-center gap-2'
              {...stopDragActivation}>
              <MoveTaskSelect
                taskId={task.id}
                taskColumnId={task.columnId}
                columns={columns}
              />
              <EditTaskDialog data={{ taskId: task.id, formValues: task }} />
              <DeleteColumnAlertDialog taskId={task.id} />
            </div>
          </div>
        </div>
      </Task>
    )
  }
)
