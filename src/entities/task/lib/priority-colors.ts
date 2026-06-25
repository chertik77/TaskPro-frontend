import type { TaskPriority } from '../model/types'

const taskPriorityColors: Record<TaskPriority, string> = {
  Low: 'bg-blue',
  Medium: 'bg-pink',
  High: 'bg-brand',
  Without: 'bg-black/30 dark:bg-white/30'
}

export const getTaskPriorityColor = (
  priority: keyof typeof taskPriorityColors
) => taskPriorityColors[priority] || taskPriorityColors.Without
