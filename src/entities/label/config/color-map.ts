import type { LabelColor } from '@/shared/api'

export const LABEL_COLOR_MAP: Record<LabelColor, string> = {
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

export const COLOR_MAP: Record<
  LabelColor,
  { className: string; value: string }
> = {
  blue: {
    className: 'bg-blue-500',
    value: '#8FB8D8'
  },
  purple: {
    className: 'bg-violet-500',
    value: '#C3A6D8'
  },
  green: {
    className: 'bg-emerald-500',
    value: '#BEDBB0'
  },
  red: {
    className: 'bg-rose-500',
    value: '#E7A6A6'
  },
  yellow: {
    className: 'bg-amber-500',
    value: '#F2D28B'
  },
  cyan: {
    className: 'bg-cyan-500',
    value: '#91D4D8'
  },
  indigo: {
    className: 'bg-indigo-500',
    value: '#A7B1E8'
  },
  gray: {
    className: 'bg-gray-500',
    value: '#B8B8B8'
  }
} as const
