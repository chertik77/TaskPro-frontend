import { format } from 'date-fns'

export const formatDeadlineDate = (
  date: Date | undefined,
  formatType = 'dd/MM/yyyy'
) => {
  if (!date) return ''

  return format(date, formatType)
}
