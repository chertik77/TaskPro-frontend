import type { TaskPriority } from '../model/types'

const taskPriorityColors: Record<TaskPriority, string> = {
  low: 'bg-blue',
  medium: 'bg-pink',
  high: 'bg-brand',
  without: 'bg-black/30 dark:bg-white/30'
}

export const getTaskPriorityColor = (
  priority: keyof typeof taskPriorityColors
) => taskPriorityColors[priority] || taskPriorityColors.without
