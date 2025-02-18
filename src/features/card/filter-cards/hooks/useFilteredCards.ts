import type { CardTypes } from '@/entities/card'

import { getFilteredCards } from '../utils/getFilteredCards'
import { useCardFilters } from './useCardFilters'

export const useFilteredCards = (cards: CardTypes.Card[]) => {
  const { priorityParam, deadlineParam } = useCardFilters()

  return getFilteredCards(cards, {
    priority: priorityParam,
    deadline: deadlineParam
  })
}
