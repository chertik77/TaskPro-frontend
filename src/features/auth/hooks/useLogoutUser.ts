import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { logout } from 'features/user/user.slice'

import { useAppDispatch } from 'hooks/redux'

import { authService } from '../auth.service'
import { AuthCacheKeys } from '../config'

export const useLogoutUser = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  return useMutation({
    mutationKey: [AuthCacheKeys.Logout],
    mutationFn: authService.logout,
    onSuccess() {
      navigate({ to: '/' })
      dispatch(logout())
    },
    onError() {
      toast.error(
        'An error occurred while logging out. Our technical team has been notified. Please try again shortly.'
      )
    }
  })
}
