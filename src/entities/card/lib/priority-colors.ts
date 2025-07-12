import type { CardPriority } from '../model/types'

const cardPriorityColors: Record<CardPriority, string> = {
  Low: 'bg-blue',
  Medium: 'bg-pink',
  High: 'bg-brand',
  Without: 'bg-black/30 dark:bg-white/30'
}

export const getCardPriorityColor = (
  priority: keyof typeof cardPriorityColors
) => cardPriorityColors[priority] || cardPriorityColors.Without
