import type { AccentColor } from '@/shared/api'

export const LABEL_COLOR_MAP: Record<AccentColor, string> = {
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  purple:
    'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
  green:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  red: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
  yellow:
    'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300',
  indigo:
    'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300',
  gray: 'bg-gray-100 text-gray-700 dark:bg-gray-500/15 dark:text-gray-300'
} as const

export const LABEL_BASE_COLOR_MAP: Record<AccentColor, string> = {
  blue: 'bg-blue-500',
  purple: 'bg-violet-500',
  green: 'bg-emerald-500',
  red: 'bg-rose-500',
  yellow: 'bg-amber-500',
  cyan: 'bg-cyan-500',
  indigo: 'bg-indigo-500',
  gray: 'bg-gray-500'
} as const
