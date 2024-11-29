import type { Deadline } from 'constants/deadlines'
import type { Priority } from 'constants/priorities'
import type { Card } from 'types'

import { addDays, isAfter, isBefore, isToday, startOfToday } from 'date-fns'

type CardFilters = {
  priority?: Priority
  deadline?: Deadline
}

const today = startOfToday()
const nextWeek = addDays(today, 7)

export const getFilteredCards = (
  cards: Card[],
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
