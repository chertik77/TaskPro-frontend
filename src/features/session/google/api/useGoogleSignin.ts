import { useMutation } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { toast } from 'sonner'

import { sessionService, useSessionStore } from '@/entities/session'

export const useGoogleSignin = () => {
  const { code } = useSearch({ from: '/auth/google/callback' })

  const { authenticate } = useSessionStore()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: () => sessionService.signinWithGoogle({ code }),
    onSuccess(data) {
      navigate({ to: '/dashboard' })
      authenticate(data)
    },
    onError() {
      navigate({ to: '/' })
      toast.error(
        'An error occurred during sign-in with Google. Please try again shortly.'
      )
    }
  })
}
