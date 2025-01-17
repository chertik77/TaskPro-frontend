import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { userService } from 'shared/api/user'
import { useAuthStore } from 'shared/store'

import { UserCacheKeys } from '../config'

export const useGetAndSetCurrentUser = () => {
  const { updateUser, isLoggedIn } = useAuthStore()

  const { data: user, isSuccess } = useQuery({
    queryKey: [UserCacheKeys.User],
    queryFn: userService.getCurrentUser,
    enabled: isLoggedIn
  })

  useEffect(() => {
    if (isSuccess && user) updateUser(user)
  }, [user, isSuccess, updateUser])
}
