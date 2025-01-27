import type { CardTypes } from '@/shared/api/card'

export const getPriorityColor = (priority: CardTypes.Priority) => {
  const priorityColors: { [key: string]: string } = {
    Low: 'bg-priority-low',
    Medium: 'bg-priority-medium',
    High: 'bg-brand',
    default: 'bg-black/30 dark:bg-white/30'
  }

  return priorityColors[priority] || priorityColors.default
}
