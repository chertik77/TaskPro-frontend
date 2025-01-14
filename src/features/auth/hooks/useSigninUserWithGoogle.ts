import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { authService } from '../auth.service'
import { useAuthStore } from '../auth.store'

export const useSigninUserWithGoogle = () => {
  const authenticate = useAuthStore(state => state.authenticate)

  const navigate = useNavigate()

  const signinWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      const r = await authService.signinWithGoogle(code)
      authenticate(r)
      navigate({ to: '/dashboard' })
    },
    onError: () =>
      toast.error(
        'Authentication failed: Unable to sign in with Google. Please try again.'
      )
  })

  return { signinWithGoogle }
}
