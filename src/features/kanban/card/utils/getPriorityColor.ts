import type { Priority } from 'features/kanban/shared/constants'

export const getPriorityColor = (priority: Priority) => {
  const priorityColors: { [key: string]: string } = {
    Low: 'bg-priority-low',
    Medium: 'bg-priority-medium',
    High: 'bg-brand',
    default: 'bg-black/30 dark:bg-white/30'
  }

  return priorityColors[priority] || priorityColors.default
}
