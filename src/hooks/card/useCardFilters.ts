import type { Priority } from 'constants/priorities'

import { useSearchParams } from 'react-router-dom'

export const useCardFiltersBySearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const cardPriority = searchParams.get('priority') as Priority
  const cardDeadline = searchParams.get('deadline') as 'asc' | 'desc'

  return { cardPriority, cardDeadline, setSearchParams, searchParams }
}
