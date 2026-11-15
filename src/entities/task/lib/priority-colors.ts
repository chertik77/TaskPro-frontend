import type { TaskPriority } from '@/shared/api'

const TASK_PRIORITY_COLORS: Record<TaskPriority, string> = {
  low: 'bg-priority-low',
  medium: 'bg-priority-medium',
  high: 'bg-green',
  without: 'bg-black/30 dark:bg-white/30'
}

export const getTaskPriorityColor = (priority: TaskPriority) =>
  TASK_PRIORITY_COLORS[priority]
