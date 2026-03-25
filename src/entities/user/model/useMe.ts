import { useQuery } from '@tanstack/react-query'

import { userQueries } from '../api/queries'

export const useMe = () => {
  const { data: user } = useQuery(userQueries.me())

  return user
}
