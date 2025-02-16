import type { CardTypes } from '@/shared/api/card'

const priorityColors: Record<string, string> = {
  Low: 'bg-priority-low',
  Medium: 'bg-priority-medium',
  High: 'bg-brand',
  default: 'bg-black/30 dark:bg-white/30'
}

export const getPriorityColor = (priority: CardTypes.Priority) =>
  priorityColors[priority] || priorityColors.default
