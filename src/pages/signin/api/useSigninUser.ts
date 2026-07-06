import type { UseFormReset } from 'react-hook-form'
import type { SigninSchema } from '../model/contract'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { sessionQueries } from '@/entities/user'

import { authClient } from '@/shared/api'

export const useSigninUser = (reset: UseFormReset<SigninSchema>) => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: SigninSchema) => authClient.signIn.email(data),
    meta: {
      errorMessage: e =>
        e?.status === 401
          ? 'The email or password you entered is incorrect. Please try again.'
          : 'An error occurred during sign-in. Our technical team has been notified. Please try again shortly.'
    },
    onSuccess(session) {
      reset()
      queryClient.setQueryData(sessionQueries.all(), session)
      navigate({ to: '/dashboard' })
    }
  })
}
