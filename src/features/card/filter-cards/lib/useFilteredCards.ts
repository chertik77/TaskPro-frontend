import type { CardTypes } from '@/entities/card'

import { getFilteredCards } from './getFilteredCards'
import { useCardFilters } from './useCardFilters'

export const useFilteredCards = (cards: CardTypes.CardsSchema) => {
  const { priorityParam, deadlineParam } = useCardFilters()

  return getFilteredCards(cards, {
    priority: priorityParam,
    deadline: deadlineParam
  })
}
