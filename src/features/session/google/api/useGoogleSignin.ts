import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { toast } from 'sonner'

import { sessionService, useSessionStore } from '@/entities/session'

export const useGoogleSignin = () => {
  const { code } = useSearch({ from: '/auth/google/callback' })

  const { authenticate } = useSessionStore()

  const navigate = useNavigate()

  const { data, isPending, isSuccess, isError } = useQuery({
    queryKey: ['auth', 'google', 'callback', code],
    queryFn: () => sessionService.signinWithGoogle({ code })
  })

  useEffect(() => {
    if (isSuccess) {
      navigate({ to: '/dashboard' })
      authenticate(data)
    }
  }, [authenticate, data, isSuccess, navigate])

  useEffect(() => {
    if (isError) {
      navigate({ to: '/' })
      toast.error(
        'An error occurred during sign-in with Google. Please try again shortly.'
      )
    }
  }, [isError, navigate])

  return { isPending }
}
