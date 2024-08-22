import type { Priority } from 'constants/priorities'

import { useSearchParams } from 'react-router-dom'

export const useCardFiltersBySearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const cardPriority = searchParams.get('priority') as Priority
  const cardSortCriterion = searchParams.get('sort')!

  return { cardPriority, cardSortCriterion, setSearchParams, searchParams }
}
