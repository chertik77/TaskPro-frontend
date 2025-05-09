import type { CardTypes } from '@/entities/card'
import type { Deadline, Priority } from '@/shared/constants'

import { addDays, isAfter, isBefore, isToday, startOfToday } from 'date-fns'

type CardFilters = {
  priority?: Priority
  deadline?: Deadline
}

const today = startOfToday()
const nextWeek = addDays(today, 7)

export const getFilteredCards = (
  cards: CardTypes.CardSchema[],
  { priority, deadline }: CardFilters
) => {
  if (!priority && !deadline) return cards

  let filteredCards = cards

  if (priority) {
    filteredCards = filteredCards.filter(card => card.priority === priority)
  }

  if (deadline) {
    filteredCards = filteredCards.filter(card => {
      const cardDeadline = card.deadline

      if (deadline === 'Overdue') {
        return isBefore(cardDeadline, today)
      }

      if (deadline === 'Upcoming') {
        return (
          isToday(cardDeadline) ||
          (isAfter(cardDeadline, today) && isBefore(cardDeadline, nextWeek))
        )
      }

      if (deadline === 'Far Future') {
        return isAfter(cardDeadline, nextWeek)
      }

      return true
    })
  }

  return filteredCards
}
