import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai/react'

import { authService } from 'features/auth/auth.service'

import { UserCacheKeys } from '../config'
import { userAtom } from '../user.atom'
import { userService } from '../user.service'

export const useGetCurrentUser = () => {
  const setUser = useSetAtom(userAtom)

  const { data, isSuccess } = useQuery({
    queryKey: [UserCacheKeys.User],
    queryFn: userService.getCurrentUser,
    enabled: authService.isSignedIn()
  })

  useEffect(() => {
    if (isSuccess) setUser(data)
  }, [data, isSuccess, setUser])
}
