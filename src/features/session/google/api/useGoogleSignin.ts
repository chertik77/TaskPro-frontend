import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { sessionService, useSessionStore } from '@/entities/session'

export const useSigninUserWithGoogle = () => {
  const { authenticate } = useSessionStore()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: sessionService.signinWithGoogle,
    meta: {
      errorMessage:
        'An error occurred during sign-in with Google. Please try again shortly.'
    },
    onSuccess(data) {
      navigate({ to: '/dashboard' })
      authenticate(data)
    }
  })
}
