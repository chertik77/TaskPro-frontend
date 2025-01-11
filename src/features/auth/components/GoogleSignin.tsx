import { useGoogleLogin } from '@react-oauth/google'
import { toast } from 'sonner'

import { authenticate } from 'features/user/user.slice'

import { Icon } from 'components/ui'
import { useAppDispatch } from 'hooks/redux'

import { authService } from '../auth.service'

export const GoogleSignin = () => {
  const dispatch = useAppDispatch()

  const signinWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      const r = await authService.signinWithGoogle(code)
      dispatch(authenticate(r))
    },
    onError: () =>
      toast.error(
        'Authentication failed: Unable to sign in with Google. Please try again.'
      )
  })

  return (
    <button
      className='flex w-8xl items-center justify-center gap-2 rounded-lg bg-black py-2.5
        text-center text-white'
      type='button'
      onClick={signinWithGoogle}>
      <Icon
        name='google'
        className='size-7'
      />
      Sign in with Google
    </button>
  )
}
