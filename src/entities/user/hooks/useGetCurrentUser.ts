import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { useAuthStore } from '@/entities/auth/@x/user'

import { userService } from '../api/service'

export const useGetCurrentUser = () => {
  const signedIn = useAuthStore(state => state.signedIn)

  const initialUser = useAuthStore(state => state.user)

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: userService.getCurrentUser,
    enabled: signedIn(),
    placeholderData: keepPreviousData,
    initialData: initialUser
  })

  return user
}
