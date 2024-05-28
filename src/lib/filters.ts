import type { EnumPriority } from 'constants/priorities'
import type { FilterInitialState } from 'redux/filter.slice'
import type { Card } from 'types'

import { isToday } from 'date-fns'

enum priorityOrder {
  'Without priority' = 0,
  Low = 1,
  Medium = 2,
  High = 3
}

const getPriorityOrder = (priority?: EnumPriority) => {
  return priority ? priorityOrder[priority] : priorityOrder['Without priority']
}

export const getSortedCardsByTodayDeadline = (cards: Card[]) =>
  cards.sort((a, b) => {
    if (isToday(a.deadline) && !isToday(b.deadline)) return -1

    if (!isToday(a.deadline) && isToday(b.deadline)) return 1

    return 0
  })

export const getVisibleCards = (cards: Card[], filters: FilterInitialState) => {
  if (!filters.sortFilter && !filters.priorityFilter)
    return getSortedCardsByTodayDeadline(cards)

  if (filters.sortFilter === 'deadline:asc-order') {
    return cards.toSorted(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    )
  }

  if (filters.sortFilter === 'deadline:desc-order') {
    return cards.toSorted(
      (a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
    )
  }

  if (
    filters.sortFilter === 'priority:desc-order' ||
    filters.sortFilter === 'priority:asc-order'
  ) {
    return cards.toSorted((a, b) => {
      const priorityComparison =
        getPriorityOrder(a.priority) - getPriorityOrder(b.priority)

      if (priorityComparison !== 0) {
        return filters.sortFilter === 'priority:asc-order'
          ? priorityComparison
          : -priorityComparison
      }

      const dateA = new Date(a.deadline).getTime()
      const dateB = new Date(b.deadline).getTime()

      return filters.sortFilter === 'priority:asc-order'
        ? dateA - dateB
        : dateB - dateA
    })
  }

  return cards.filter(card => card.priority === filters.priorityFilter)
}
