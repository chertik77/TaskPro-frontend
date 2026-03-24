import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { toast } from 'sonner'

import { sessionService, useSessionStore } from '@/entities/session'

export const useGoogleSignin = () => {
  const { code, state } = useSearch({ from: '/auth/google/callback' })

  const { authenticate } = useSessionStore()

  const navigate = useNavigate()

  const { isError, isSuccess, data, isPending } = useQuery({
    queryKey: ['google-signin', code, state],
    queryFn: () => sessionService.signinWithGoogle({ code, state })
  })

  if (isError) {
    toast.error(
      'An error occurred during sign-in with Google. Please try again shortly.'
    )
    navigate({ to: '/' })
  }

  if (isSuccess) {
    navigate({ to: '/dashboard' })
    authenticate(data)
  }

  return { isPending }
}
