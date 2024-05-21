import type { ClassValue } from 'clsx'
import type { Card } from 'types/board.types'

import { clsx } from 'clsx'
import { format, isToday } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Low':
      return 'bg-priority-low'
    case 'Medium':
      return 'bg-priority-medium'
    case 'High':
      return 'bg-brand'
    default:
      return 'bg-black/30 dark:bg-white/30'
  }
}

export const getVisibleCards = (cards: Card[], filter: string) => {
  if (!filter) return cards

  return cards.filter(card => card.priority === filter)
}

export const formatTodayDate = (date: Date) => {
  return isToday(date)
    ? `Today, ${format(date, 'MMMM d')}`
    : format(date, 'dd/MM/yyyy')
}
