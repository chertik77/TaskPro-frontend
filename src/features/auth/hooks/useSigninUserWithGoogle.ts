import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from '@tanstack/react-router'
import { useSetAtom } from 'jotai/react'
import { toast } from 'sonner'

import { userAtom } from 'features/user/user.atom'

import { authService } from '../auth.service'

export const useSigninUserWithGoogle = () => {
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

  return { signinWithGoogle }
}
