import type { Priority } from '../config/priority.constants'

const priorityColors: Record<Priority, string> = {
  Low: 'bg-blue',
  Medium: 'bg-pink',
  High: 'bg-brand',
  Without: 'bg-black/30 dark:bg-white/30'
}

export const getPriorityColor = (priority: Priority) =>
  priorityColors[priority] || priorityColors.Without
