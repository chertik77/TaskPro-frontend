import { useMutation } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { BurgerMenu } from 'components/dashboard/modals'

import { useAppDispatch } from 'hooks/redux'

import { logout } from 'redux/user.slice'

import { CacheKeys } from 'config'
import { authService } from 'services'

export const useLogoutUser = () => {
  const dispatch = useAppDispatch()

  const { close: closeBurgerMenu } = useModal(BurgerMenu)

  return useMutation({
    mutationKey: [CacheKeys.Logout],
    mutationFn: authService.logout,
    onSuccess() {
      dispatch(logout())
    },
    onError() {
      toast.error(
        'An error occurred while logging out. Our technical team has been notified. Please try again shortly.'
      )
    },
    onSettled() {
      closeBurgerMenu()
    }
  })
}
