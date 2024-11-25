import type { Priority } from 'constants/priorities'
import type { Card } from 'types'

export const getFilteredCardsByPriority = (
  cards: Card[],
  priority: Priority
) => {
  if (!priority) return cards

  return cards.filter(card => card.priority === priority)
}
