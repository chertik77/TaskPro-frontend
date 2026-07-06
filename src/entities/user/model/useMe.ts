import { useQuery } from '@tanstack/react-query'

import { sessionQueries } from '../api/queries'

export const useMe = () => {
  const { data: user } = useQuery({
    ...sessionQueries.current(),
    select: session => session?.user ?? null
  })

  return user
}
