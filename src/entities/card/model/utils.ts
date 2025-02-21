import type { Priority } from './types'

import { format, isToday } from 'date-fns'

const priorityColors: Record<string, string> = {
  Low: 'bg-blue',
  Medium: 'bg-pink',
  High: 'bg-brand',
  default: 'bg-black/30 dark:bg-white/30'
}

export const getPriorityColor = (priority: Priority) =>
  priorityColors[priority] || priorityColors.default

export const formatTodayDate = (date: Date) =>
  isToday(date)
    ? `Today, ${format(date, 'MMMM d')}`
    : format(date, 'dd/MM/yyyy')
