import type { TaskPriority } from '@/shared/api'

export const TASK_PRIORITY_COLORS: Record<TaskPriority, string> = {
  low: 'bg-priority-low',
  medium: 'bg-priority-medium',
  high: 'bg-green',
  without: 'bg-black/30 dark:bg-white/30'
} as const

export const getTaskPriorityColor = (
  priority: keyof typeof TASK_PRIORITY_COLORS
) => TASK_PRIORITY_COLORS[priority] || TASK_PRIORITY_COLORS.without
