import { useSuspenseQuery } from '@tanstack/react-query'

import { userQueries } from '../api/queries'

export const useMe = () => {
  const { data: user } = useSuspenseQuery(userQueries.me())

  return user
}
