import type { ClassValue } from 'clsx'

import { clsx } from 'clsx'
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
