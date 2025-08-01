import type { UseFormReset } from 'react-hook-form'
import type { SigninSchema } from '../model/contract'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { sessionService } from '@/entities/session'
import { userQueries } from '@/entities/user'

export const useSigninUser = (reset: UseFormReset<SigninSchema>) => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: sessionService.signin,
    meta: {
      errorMessage: e =>
        e?.response?.status === 401
          ? 'The email or password you entered is incorrect. Please try again.'
          : 'An error occurred during sign-in. Our technical team has been notified. Please try again shortly.'
    },
    onSuccess({ user }) {
      reset()
      queryClient.setQueryData(userQueries.current(), user)
      navigate({ to: '/dashboard' })
    }
  })
}
