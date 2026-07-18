import { format } from 'date-fns'

export const DATE_FORMAT_MAP = {
  dd_mm_yyyy: 'dd/MM/yyyy',
  mm_dd_yyyy: 'MM/dd/yyyy',
  yyyy_mm_dd: 'yyyy/MM/dd'
} as const

export const formatDeadline = (
  date: Date | string | undefined,
  formatType = 'dd/MM/yyyy'
) => {
  if (!date) return ''

  return format(date, formatType)
}
