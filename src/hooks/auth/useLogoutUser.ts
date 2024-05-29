import { useTheme } from 'contexts/theme.context'
import { useModal } from 'react-modal-state'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import { BurgerMenu } from 'components/dashboard/modals'

import { useAppMutation } from 'hooks'

import { logout } from 'redux/user.slice'

import { authService } from 'services'

export const useLogoutUser = () => {
  const dispatch = useDispatch()

  const { setTheme } = useTheme()

  const { close: closeBurgerMenu } = useModal(BurgerMenu)

  return useAppMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess() {
      setTheme('light')
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
