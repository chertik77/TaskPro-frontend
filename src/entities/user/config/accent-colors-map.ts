import type { AccentColor } from '@/shared/api'

export const ACCENT_COLOR_MAP: Record<AccentColor, string> = {
  blue: '#8FB8D8',
  purple: '#C3A6D8',
  green: '#BEDBB0',
  red: '#E7A6A6',
  yellow: '#F2D28B',
  cyan: '#91D4D8',
  indigo: '#A7B1E8',
  gray: '#B8B8B8'
} as const
