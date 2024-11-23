import type { ClassValue } from 'clsx'
import type { Priority } from 'constants/priorities'

import { clsx } from 'clsx'
import { format, isToday } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const getPriorityColor = (priority: Priority) => {
  const priorityColors: { [key: string]: string } = {
    Low: 'bg-priority-low',
    Medium: 'bg-priority-medium',
    High: 'bg-brand',
    default: 'bg-black/30 dark:bg-white/30'
  }

  return priorityColors[priority] || priorityColors.default
}

export const formatTodayDate = (date: Date) =>
  isToday(date)
    ? `Today, ${format(date, 'MMMM d')}`
    : format(date, 'dd/MM/yyyy')
