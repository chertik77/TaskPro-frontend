import type { TaskSettings } from '@/shared/api'

import { parseDate } from 'chrono-node'
import { startOfDay } from 'date-fns'

type DefaultDeadline = TaskSettings['defaultDeadline']

const DEFAULT_DEADLINE_MAP: Record<DefaultDeadline, string | null> = {
  none: null,
  today: 'Today',
  tomorrow: 'Tomorrow',
  three_days: 'In 3 days',
  one_week: 'In 1 week'
}

export const resolveDefaultDeadline = (preset: DefaultDeadline | undefined) => {
  const text = preset ? DEFAULT_DEADLINE_MAP[preset] : null

  if (!text) return undefined

  const parsed = parseDate(text)

  return parsed ? startOfDay(parsed) : undefined
}
