import { format, isToday } from 'date-fns'

export const formatTodayDate = (date: Date) =>
  isToday(date)
    ? `Today, ${format(date, 'MMMM d')}`
    : format(date, 'dd/MM/yyyy')
