import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from '@tanstack/react-router'
import { useSetAtom } from 'jotai/react'
import { toast } from 'sonner'

import { userAtom } from 'features/user/user.atom'

import { Icon } from 'components/ui'

import { authService } from '../auth.service'

export const GoogleSignin = () => {
  const setUser = useSetAtom(userAtom)

  const navigate = useNavigate()

  const signinWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      const user = await authService.signinWithGoogle(code)
      setUser(user)
      navigate({ to: '/dashboard' })
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
      Continue with Google
    </button>
  )
}
