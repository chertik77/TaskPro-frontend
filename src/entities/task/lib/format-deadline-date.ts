import { format } from 'date-fns'

export const formatDeadlineDate = (date: Date, formatType = 'dd/MM/yyyy') =>
  format(date, formatType)
