import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { sessionService, useSessionStore } from '@/entities/session'

export const useGoogleSignin = () => {
  const { authenticate } = useSessionStore()

  const navigate = useNavigate()

  return useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      const r = await sessionService.signinWithGoogle({ code })
      authenticate(r)
      navigate({ to: '/dashboard' })
    },
    onError: () =>
      toast.error(
        'Authentication failed: Unable to sign in with Google. Please try again.'
      )
  })
}
