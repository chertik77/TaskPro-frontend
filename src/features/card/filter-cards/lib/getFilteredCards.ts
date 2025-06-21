import type { CardTypes, Deadline, Priority } from '@/entities/card'

import {
  addDays,
  isAfter,
  isBefore,
  isWithinInterval,
  startOfToday
} from 'date-fns'

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

      if (deadline === 'Overdue') return isBefore(cardDeadline, today)

      if (deadline === 'Upcoming') {
        return isWithinInterval(cardDeadline, {
          start: today,
          end: nextWeek
        })
      }

      if (deadline === 'Far Future') return isAfter(cardDeadline, nextWeek)

      return true
    })
  }

  return filteredCards
}
