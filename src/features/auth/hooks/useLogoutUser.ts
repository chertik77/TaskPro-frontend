import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { logout } from 'features/user/user.slice'

import { useAppDispatch } from 'hooks/redux'

import { authService } from '../auth.service'
import { AuthCacheKeys } from '../config'

export const useLogoutUser = () => {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationKey: [AuthCacheKeys.Logout],
    mutationFn: authService.logout,
    onSuccess() {
      dispatch(logout())
    },
    onError() {
      toast.error(
        'An error occurred while logging out. Our technical team has been notified. Please try again shortly.'
      )
    }
  })
}
