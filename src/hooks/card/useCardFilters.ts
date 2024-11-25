import type { Priority } from 'constants/priorities'

import { useSearchParams } from 'react-router-dom'

export const useCardFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const cardPriority = searchParams.get('priority') as Priority

  return { cardPriority, setSearchParams, searchParams }
}
