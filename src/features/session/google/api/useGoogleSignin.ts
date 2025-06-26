import { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { sessionService, useSessionStore } from '@/entities/session'

export const useGoogleSignin = () => {
  const [loading, setIsLoading] = useState(false)

  const { authenticate } = useSessionStore()

  const navigate = useNavigate()

  const signinWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      setIsLoading(true)
      const r = await sessionService.signinWithGoogle({ code })
      authenticate(r)
      navigate({ to: '/dashboard' })
    },
    onError: () => {
      setIsLoading(false)
      toast.error(
        'Authentication failed: Unable to sign in with Google. Please try again.'
      )
    }
  })

  return { signinWithGoogle, loading }
}
