import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { selectIsLoggedIn, updateUser } from 'features/user/user.slice'

import { useAppDispatch, useAppSelector } from 'hooks/redux'

import { UserCacheKeys } from '../config'
import { userService } from '../user.service'

export const useGetCurrentUser = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()

  const { data, isSuccess } = useQuery({
    queryKey: [UserCacheKeys.User],
    queryFn: userService.getCurrentUser,
    enabled: isLoggedIn
  })

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateUser(data))
    }
  }, [data, dispatch, isSuccess])
}
