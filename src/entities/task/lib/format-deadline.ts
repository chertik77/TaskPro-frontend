import { format } from 'date-fns'

export const formatDeadline = (
  date: Date | string | undefined,
  formatType = 'dd/MM/yyyy'
) => {
  if (!date) return ''

  return format(date, formatType)
}
