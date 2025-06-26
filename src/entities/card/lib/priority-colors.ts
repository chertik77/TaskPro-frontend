import type { CardPriority } from '../model/types'

const priorityColors: Record<CardPriority, string> = {
  Low: 'bg-blue',
  Medium: 'bg-pink',
  High: 'bg-brand',
  Without: 'bg-black/30 dark:bg-white/30'
}

export const getPriorityColor = (priority: CardPriority) =>
  priorityColors[priority] || priorityColors.Without
