import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from 'store'

import { UserCacheKeys } from '../config'
import { userService } from '../user.service'

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
