import { useModal } from 'react-modal-state'
import { useDispatch } from 'react-redux'

import { BurgerMenu } from 'components/dashboard/modals'

import { useAppMutation } from 'hooks'

import { logout } from 'redux/user.slice'

import { authService } from 'services'

export const useLogoutUser = () => {
  const dispatch = useDispatch()

  const { close: closeBurgerMenu } = useModal(BurgerMenu)

  return useAppMutation({
    mutationKey: ['logout'],
    mutationFn: authService.logout,
    toastErrorMessage:
      'An error occurred while logging out. Our technical team has been notified. Please try again shortly.',
    onSuccess() {
      document.cookie = `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`
      dispatch(logout())
    },
    onSettled() {
      closeBurgerMenu()
    }
  })
}
