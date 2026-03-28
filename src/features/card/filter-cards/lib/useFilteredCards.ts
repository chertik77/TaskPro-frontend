import type { CardTypes } from '@/entities/card'
import type { IFuseOptions } from 'fuse.js'

import { useMemo } from 'react'
import {
  addDays,
  isAfter,
  isBefore,
  isWithinInterval,
  startOfToday
} from 'date-fns'
import Fuse from 'fuse.js'

import { useCardFilters } from './useCardFilters'

const today = startOfToday()
const nextWeek = addDays(today, 7)

const fuseOptions: IFuseOptions<CardTypes.CardSchema> = {
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'description', weight: 0.3 }
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2
}

export const useFilteredCards = (cards: CardTypes.CardsSchema) => {
  const {
    priorityParam: priority,
    deadlineParam: deadline,
    searchParam: search
  } = useCardFilters()

  const fuse = useMemo(() => new Fuse(cards, fuseOptions), [cards])

  if (!priority && !deadline && !search) return cards

  let filteredCards = cards

  if (search) {
    filteredCards = fuse.search(search).map(({ item }) => item)
  }

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
