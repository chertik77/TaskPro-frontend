import { useGoogleOneTapLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import { useTabletAndBelowMediaQuery } from 'hooks/useTabletAndBelowMediaQuery'

import { authenticate } from 'redux/user.slice'

import { authService } from 'services'

export const useGoogleOneTap = () => {
  const dispatch = useDispatch()

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return useGoogleOneTapLogin({
    cancel_on_tap_outside: false,
    onSuccess: async credentialResponse => {
      const r = await authService.signinWithGoogle(
        credentialResponse.credential!
      )
      dispatch(authenticate(r))
    },
    disabled: isTabletAndBelow,
    onError: () =>
      toast.error(
        'Authentication failed: Unable to sign in with Google. Please try again.'
      )
  })
}
