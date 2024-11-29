import type { Deadline } from 'constants/deadlines'
import type { Priority } from 'constants/priorities'

import { useSearchParams } from 'react-router-dom'

export const useCardFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const cardPriority = searchParams.get('priority') as Priority
  const cardDeadline = searchParams.get('deadline') as Deadline

  return { cardPriority, cardDeadline, setSearchParams, searchParams }
}
