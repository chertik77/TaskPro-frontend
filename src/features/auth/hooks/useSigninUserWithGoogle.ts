import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { authService } from '../auth.service'

export const useSigninUserWithGoogle = () => {
  const navigate = useNavigate()

  const signinWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      await authService.signinWithGoogle(code)
      navigate({ to: '/dashboard' })
    },
    onError: () =>
      toast.error(
        'Authentication failed: Unable to sign in with Google. Please try again.'
      )
  })

  return { signinWithGoogle }
}
