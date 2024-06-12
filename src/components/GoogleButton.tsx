import { GoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import { authenticate } from 'redux/user.slice'

import { authService } from 'services'

export const GoogleButton = () => {
  const dispatch = useDispatch()

  return (
    <GoogleLogin
      onSuccess={async credentialResponse => {
        const r = await authService.signinWithGoogle(
          credentialResponse.credential!
        )
        dispatch(authenticate(r))
      }}
      onError={() =>
        toast.error(
          'Authentication failed: Unable to sign in with Google. Please try again.'
        )
      }
      logo_alignment='center'
      theme='filled_black'
      shape='circle'
      width={335}
    />
  )
}
