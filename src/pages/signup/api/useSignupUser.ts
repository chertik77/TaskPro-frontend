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
    mutationFn: sessionService.signin,
    meta: {
      errorMessage: e =>
        e?.status === 422
          ? 'An account with this email address already exists. Please sign in or use a different email.'
          : 'An error occurred during sign-up. Our technical team has been notified. Please try again shortly.'
    },
    onSuccess(data) {
      reset()
      queryClient.setQueryData(userQueries.current(), data?.user)
      navigate({ to: '/dashboard' })
    }
  })
}
