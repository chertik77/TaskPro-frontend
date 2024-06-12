import { useGoogleOneTapLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'sonner'

import { authenticate } from 'redux/user.slice'

import { authService } from 'services'

export const useSigninUserWithGoogle = () => {
  const dispatch = useDispatch()

  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 1439px)' })

  return useGoogleOneTapLogin({
    cancel_on_tap_outside: false,
    onSuccess: async credentialResponse => {
      const r = await authService.signinWithGoogle(
        credentialResponse.credential!
      )
      dispatch(authenticate(r))
    },
    disabled: isMobileOrTablet,
    onError: () =>
      toast.error(
        'Authentication failed: Unable to sign in with Google. Please try again.'
      )
  })
}
