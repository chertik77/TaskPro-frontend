import type { ComponentProps } from 'react'
import type { TaskSchema } from '../model/types'

import { createContext, use, useMemo } from 'react'
import { mergeProps, useRender } from '@base-ui/react'
import { isToday } from 'date-fns'

import { Label, LABEL_COLOR_MAP } from '@/entities/label/@x/task'

import { cn } from '@/shared/lib'
import { Icon } from '@/shared/ui'

import { formatDeadlineDate } from '../lib/format-deadline-date'
import { getTaskPriorityColor } from '../lib/priority-colors'

type TaskContext = {
  task: TaskSchema
}

const TaskContext = createContext<TaskContext | undefined>(undefined)

const useTaskContext = () => {
  const context = use(TaskContext)

  if (!context) {
    throw new Error('useTaskContext must be used with a TaskContext.Provider')
  }

  return context
}

type TaskProviderProps = TaskContext & ComponentProps<'div'>

const TaskProvider = ({
  task,
  className,
  children,
  ...props
}: TaskProviderProps) => {
  const value = useMemo(() => ({ task }), [task])

  return (
    <TaskContext value={value}>
      <div
        className={cn(
          `relative min-h-38.5 overflow-hidden rounded-lg bg-white py-3.5 pr-5
          pl-6 dark:bg-black`,
          className
        )}
        {...props}>
        {children}
      </div>
    </TaskContext>
  )
}

const TaskPriorityIndicator = ({
  className,
  ...props
}: ComponentProps<'span'>) => {
  const { task } = useTaskContext()

  return (
    <span
      className={cn(
        'absolute top-0 left-0 h-full w-1 rounded-l',
        getTaskPriorityColor(task.priority),
        className
      )}
      {...props}
    />
  )
}

const TaskTitle = ({ className, ...props }: ComponentProps<'p'>) => {
  const { task } = useTaskContext()

  return (
    <p
      className={cn('mr-12 mb-2 truncate text-base font-semibold', className)}
      {...props}>
      {task.title}
    </p>
  )
}

const TaskDescription = ({ className, ...props }: ComponentProps<'p'>) => {
  const { task } = useTaskContext()

  return (
    <p
      className={cn(
        `text-md mb-3.5 line-clamp-2 max-w-68.75 text-balance break-all
        text-black/70 dark:text-white/50`,
        className
      )}
      {...props}>
      {task.description}
    </p>
  )
}

const TaskLabels = () => {
  const {
    task: { labels }
  } = useTaskContext()

  if (!labels?.length) return null

  const labelsPerRow = 3

  return (
    <div className={cn('mb-2 flex flex-wrap items-center gap-1.5')}>
      {labels.slice(0, labelsPerRow).map(label => (
        <Label
          key={label.id}
          className={LABEL_COLOR_MAP[label.color]}>
          {label.name}
        </Label>
      ))}
      {labels.length > 1 && (
        <span
          className='bg-white-muted dark:bg-black-muted rounded-md px-2 py-0.5
            text-[11px]'>
          +{labels.length - labelsPerRow}
        </span>
      )}
    </div>
  )
}

const TaskPriority = ({ className }: { className?: string }) => {
  const { task } = useTaskContext()

  return (
    <div className={cn('mr-3.5', className)}>
      <p className='mb-1 text-xs text-black/50 dark:text-white/50'>Priority</p>
      <div className='flex items-center gap-1'>
        <div
          className={cn(
            'size-3 rounded-full',
            getTaskPriorityColor(task.priority)
          )}
        />
        <p className='text-sm'>{task.priority}</p>
      </div>
    </div>
  )
}

const TaskDeadline = ({ className }: { className?: string }) => {
  const { task } = useTaskContext()

  return (
    <div className={cn(className)}>
      <p className='mb-1 text-xs text-black/50 dark:text-white/50'>Deadline</p>
      <p className='text-sm'>{formatDeadlineDate(task.deadline)}</p>
    </div>
  )
}

const TaskDeadlineTodayIndicator = ({ className }: { className?: string }) => {
  const { task } = useTaskContext()

  return (
    isToday(task.deadline) && (
      <Icon
        name='bell'
        className={cn(
          'stroke-brand violet:stroke-brand-violet size-4.5 animate-bounce pr-1',
          className
        )}
      />
    )
  )
}

const TaskActionButton = ({
  className,
  render,
  ...props
}: useRender.ComponentProps<'button'>) => {
  const defaultProps: useRender.ElementProps<'button'> = {
    type: 'button',
    className: cn(
      `focus-visible:styled-outline hocus:text-black
        dark:hocus:text-white-soft dark:text-white-soft/50 text-black/50
        [&_svg]:size-4`,
      className
    )
  }

  return useRender({
    defaultTagName: 'button',
    render,
    props: mergeProps<'button'>(defaultProps, props)
  })
}

export const Task = Object.assign(TaskProvider, {
  PriorityIndicator: TaskPriorityIndicator,
  Title: TaskTitle,
  Description: TaskDescription,
  Labels: TaskLabels,
  Priority: TaskPriority,
  Deadline: TaskDeadline,
  DeadlineTodayIndicator: TaskDeadlineTodayIndicator,
  ActionButton: TaskActionButton
})
