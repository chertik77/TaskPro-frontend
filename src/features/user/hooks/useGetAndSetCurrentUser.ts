import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai/react'

import { authService } from 'features/auth/auth.service'

import { UserCacheKeys } from '../config'
import { userAtom } from '../user.atom'
import { userService } from '../user.service'

export const useGetAndSetCurrentUser = () => {
  const setUser = useSetAtom(userAtom)

  const { data: user, isSuccess } = useQuery({
    queryKey: [UserCacheKeys.User],
    queryFn: userService.getCurrentUser,
    enabled: authService.isSignedIn()
  })

  useEffect(() => {
    if (isSuccess && user) setUser(user)
  }, [user, isSuccess, setUser])
}
