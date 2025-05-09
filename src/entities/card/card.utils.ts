import type { Priority } from '@/shared/constants'

import { format, isToday } from 'date-fns'

const priorityColors: Record<Priority, string> = {
  Low: 'bg-blue',
  Medium: 'bg-pink',
  High: 'bg-brand',
  Without: 'bg-black/30 dark:bg-white/30'
}

export const getPriorityColor = (priority: Priority) =>
  priorityColors[priority] || priorityColors.Without

export const formatTodayDate = (date: Date) =>
  isToday(date)
    ? `Today, ${format(date, 'MMMM d')}`
    : format(date, 'dd/MM/yyyy')
