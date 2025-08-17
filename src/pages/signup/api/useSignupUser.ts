import type { UseFormReset } from 'react-hook-form'
import type { SignupSchema } from '../model/contract'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { sessionService } from '@/entities/session'
import { userQueries } from '@/entities/user'

export const useSignupUser = (reset: UseFormReset<SignupSchema>) => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: sessionService.signup,
    meta: {
      errorMessage: e =>
        e?.response?.status === 409
          ? 'An account with this email address already exists. Please sign in or use a different email.'
          : 'An error occurred during sign-up. Our technical team has been notified. Please try again shortly.'
    },
    onSuccess({ user }) {
      reset()
      queryClient.setQueryData(userQueries.current(), user)
      navigate({ to: '/dashboard' })
    }
  })
}
