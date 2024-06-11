import type { Priority } from 'constants/priorities'
import type { Card } from 'types'

import { isToday } from 'date-fns'

enum priorityOrder {
  'Without priority' = 0,
  Low = 1,
  Medium = 2,
  High = 3
}

const getPriorityOrder = (priority?: Priority) => {
  return priority ? priorityOrder[priority] : priorityOrder['Without priority']
}

export const getSortedCardsByTodayDeadline = (cards: Card[]) =>
  cards.sort((a, b) => {
    if (isToday(a.deadline) && !isToday(b.deadline)) return -1

    if (!isToday(a.deadline) && isToday(b.deadline)) return 1

    return 0
  })

export const getFilteredCardsByPriority = (cards: Card[], priority: string) => {
  if (!priority) return getSortedCardsByTodayDeadline(cards)

  return cards.filter(card => card.priority === priority)
}

export const getSortedCards = (cards: Card[], sortValue: string) => {
  if (!sortValue) return cards

  if (sortValue === 'deadline:asc-order') {
    return cards.toSorted(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    )
  }

  if (sortValue === 'deadline:desc-order') {
    return cards.toSorted(
      (a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
    )
  }

  if (
    sortValue === 'priority:desc-order' ||
    sortValue === 'priority:asc-order'
  ) {
    return cards.toSorted((a, b) => {
      const priorityComparison =
        getPriorityOrder(a.priority) - getPriorityOrder(b.priority)

      if (priorityComparison !== 0) {
        return sortValue === 'priority:asc-order'
          ? priorityComparison
          : -priorityComparison
      }

      const dateA = new Date(a.deadline).getTime()
      const dateB = new Date(b.deadline).getTime()

      return sortValue === 'priority:asc-order' ? dateA - dateB : dateB - dateA
    })
  }
}
