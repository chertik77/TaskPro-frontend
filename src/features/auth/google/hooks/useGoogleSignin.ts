import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { authService } from '@/shared/api/auth'
import { useAuthStore } from '@/shared/store'

export const useGoogleSignin = () => {
  const { authenticate } = useAuthStore()

  const navigate = useNavigate()

  return useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      const r = await authService.signinWithGoogle({ code })
      authenticate(r)
      navigate({ to: '/dashboard' })
    },
    onError: () =>
      toast.error(
        'Authentication failed: Unable to sign in with Google. Please try again.'
      )
  })
}
