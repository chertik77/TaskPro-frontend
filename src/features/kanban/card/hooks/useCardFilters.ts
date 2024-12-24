import type { Deadline } from 'features/kanban/filters/filters.constants'
import type { Priority } from '../card.constants'

import { useSearchParams } from 'react-router-dom'

export const useCardFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const cardPriority = searchParams.get('priority') as Priority
  const cardDeadline = searchParams.get('deadline') as Deadline

  return { cardPriority, cardDeadline, setSearchParams, searchParams }
}
