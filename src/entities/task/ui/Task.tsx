import type { TaskSettings, Task as TTask } from '@/shared/api'
import type { ComponentProps } from 'react'

import { createContext, use, useMemo } from 'react'
import { mergeProps, useRender } from '@base-ui/react'
import { isBefore, isToday, startOfToday } from 'date-fns'
import { BellRingIcon } from 'lucide-react'

import {
  Label,
  LABEL_BASE_COLOR_MAP,
  LABEL_COLOR_MAP
} from '@/entities/label/@x/task'
import { useSettings } from '@/entities/setting/@x/task'

import { capitalize, cn } from '@/shared/lib'
import { Checkbox } from '@/shared/ui'

import { DATE_FORMAT_MAP } from '../config/date-format-map'
import { parseDeadline } from '../lib/deadline-day'
import { formatDeadline } from '../lib/format-deadline'
import { getTaskPriorityColor } from '../lib/priority-colors'
import { useCardDensity } from '../lib/useCardDensity'

type TaskContext = {
  task: TTask
  density: TaskSettings['cardDensity']
}

const TaskContext = createContext<TaskContext | undefined>(undefined)

const useTaskContext = () => {
  const context = use(TaskContext)

  if (!context) {
    throw new Error('useTaskContext must be used with a TaskContext.Provider')
  }

  return context
}

type TaskProviderProps = { task: TTask } & ComponentProps<'div'>

const TaskProvider = ({
  task,
  className,
  children,
  ...props
}: TaskProviderProps) => {
  const density = useCardDensity()

  const value = useMemo(() => ({ task, density }), [task, density])

  return (
    <TaskContext value={value}>
      <div
        className={cn(
          'relative overflow-hidden rounded-lg bg-white dark:bg-black',
          density === 'compact'
            ? 'py-2.5 pr-3.5 pl-4'
            : 'min-h-38.5 py-3.5 pr-5 pl-6',
          task.completed &&
            'opacity-90 brightness-95 saturate-100 dark:brightness-125',
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

  const { data: showPriorityIndicator } = useSettings(
    state => state.task.showPriorityIndicator
  )

  if (!showPriorityIndicator) return null

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
  const { task, density } = useTaskContext()

  return (
    <p
      className={cn(
        'text-md max-w-60 truncate font-semibold',
        density === 'comfortable' && 'mb-2 text-base',
        task.completed && 'text-black/40 line-through dark:text-white/40',
        className
      )}
      {...props}>
      {task.title}
    </p>
  )
}

const TaskDescription = ({ className, ...props }: ComponentProps<'p'>) => {
  const { task, density } = useTaskContext()

  return (
    task.description && (
      <p
        className={cn(
          `text-md max-w-68.75 text-balance text-ellipsis text-black/70
          dark:text-white/50`,
          density === 'compact' ? 'mb-1.5 line-clamp-1' : 'mb-3.5 line-clamp-2',
          task.completed && 'text-black/40 dark:text-white/40',
          className
        )}
        {...props}>
        {task.description}
      </p>
    )
  )
}

const TaskCompletedToggle = ({
  className,
  onCheckedChange,
  ...props
}: ComponentProps<typeof Checkbox>) => {
  const { task } = useTaskContext()

  return (
    <Checkbox
      checked={task.completed}
      onCheckedChange={onCheckedChange}
      className={cn('size-5', className)}
      {...props}
    />
  )
}

const TaskLabels = ({ className, ...props }: ComponentProps<'div'>) => {
  const {
    task: { labels },
    density
  } = useTaskContext()

  const { data } = useSettings(state => state.label)

  if (!labels?.length || data?.labelDisplay === 'hidden') return null

  let max = data?.maxLabelsShown

  if (max === 0) max = Infinity

  const visibleLabels = labels.slice(0, max)

  const hiddenCount = labels.length - visibleLabels.length

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-1.5',
        density === 'compact' ? 'mb-1' : 'mb-2',
        className
      )}
      {...props}>
      {visibleLabels.map(label => (
        <Label
          key={label.id}
          className={cn(
            data?.labelDisplay === 'compact'
              ? LABEL_BASE_COLOR_MAP[label.color]
              : LABEL_COLOR_MAP[label.color]
          )}>
          {data?.labelDisplay === 'full' && label.name}
        </Label>
      ))}
      {hiddenCount > 0 && (
        <span
          className='bg-white-muted dark:bg-black-muted rounded-md px-2 py-0.5
            text-[11px]'>
          +{hiddenCount}
        </span>
      )}
    </div>
  )
}

const TaskPriority = ({ className }: { className?: string }) => {
  const { task, density } = useTaskContext()

  const isCompact = density === 'compact'

  return (
    <div
      className={cn(
        isCompact ? 'mr-2' : 'mr-3.5',
        task.completed && 'text-black/40 dark:text-white/40',
        className
      )}>
      {!isCompact && (
        <p className='mb-1 text-xs text-black/50 dark:text-white/50'>
          Priority
        </p>
      )}
      <div className='flex items-center gap-1'>
        <div
          className={cn(
            'size-3 rounded-full',
            getTaskPriorityColor(task.priority)
          )}
        />
        {isCompact ? (
          <span className='sr-only'>Priority: {capitalize(task.priority)}</span>
        ) : (
          <p className='text-sm'>{capitalize(task.priority)}</p>
        )}
      </div>
    </div>
  )
}

const TaskDeadline = ({ className }: { className?: string }) => {
  const { task, density } = useTaskContext()

  const { data: dateFormat } = useSettings(state => state.general.dateFormat)

  const { data: overdueHighlight } = useSettings(
    state => state.task.overdueHighlight
  )

  const deadline = parseDeadline(task.deadline)

  const isOverdue =
    !!deadline && !task.completed && isBefore(deadline, startOfToday())

  return (
    deadline && (
      <div
        className={cn(
          task.completed && 'text-black/40 dark:text-white/40',
          className
        )}>
        {density === 'comfortable' && (
          <p className='mb-1 text-xs text-black/50 dark:text-white/50'>
            Deadline
          </p>
        )}
        <p
          className={cn(
            'text-sm',
            overdueHighlight && isOverdue && 'text-red font-medium'
          )}>
          {formatDeadline(
            deadline,
            DATE_FORMAT_MAP[dateFormat ?? 'dd_mm_yyyy']
          )}
        </p>
      </div>
    )
  )
}

const TaskDeadlineTodayIndicator = ({ className }: { className?: string }) => {
  const { task } = useTaskContext()

  const deadline = parseDeadline(task.deadline)

  return (
    deadline &&
    isToday(deadline) && (
      <BellRingIcon
        className={cn('stroke-accent size-4.5 animate-bounce pr-1', className)}
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
      `focus-visible:styled-outline dark:text-white-soft text-black
        [&_svg]:size-4 [&_svg]:opacity-50 hocus:[&_svg]:opacity-100
        [&_svg]:transition-opacity`,
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
  CompletedToggle: TaskCompletedToggle,
  Description: TaskDescription,
  Labels: TaskLabels,
  Priority: TaskPriority,
  Deadline: TaskDeadline,
  DeadlineTodayIndicator: TaskDeadlineTodayIndicator,
  ActionButton: TaskActionButton
})
