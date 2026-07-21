import type { TaskPriority } from '@/shared/api'

const taskPriorityColors: Record<TaskPriority, string> = {
  low: 'bg-priority-low',
  medium: 'bg-priority-medium',
  high: 'bg-green',
  without: 'bg-black/30 dark:bg-white/30'
}

export const getTaskPriorityColor = (
  priority: keyof typeof taskPriorityColors
) => taskPriorityColors[priority] || taskPriorityColors.without
