import { useEffect } from 'react'
import { userService } from '@/shared/api/user'
import { useAuthStore } from '@/shared/store'
import { useQuery } from '@tanstack/react-query'

export const useGetAndSetCurrentUser = () => {
  const { updateUser, isLoggedIn } = useAuthStore()

  const { data: user, isSuccess } = useQuery({
    queryKey: ['user'],
    queryFn: userService.getCurrentUser,
    enabled: isLoggedIn
  })

  useEffect(() => {
    if (isSuccess && user) updateUser(user)
  }, [user, isSuccess, updateUser])
}
