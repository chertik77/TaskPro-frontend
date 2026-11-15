import type { UseFormReset } from 'react-hook-form'
import type { SigninSchema } from '../model/contract'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { refetchSession } from '@/entities/user'

import { authClient, authErrorMessage } from '@/shared/api'

export const useSigninUser = (reset: UseFormReset<SigninSchema>) => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: SigninSchema) => authClient.signIn.email(data),
    meta: {
      errorMessage: authErrorMessage(
        'An error occurred during sign-in. Our technical team has been notified. Please try again.'
      )
    },
    async onSuccess() {
      reset()
      await refetchSession(queryClient)
      navigate({ to: '/dashboard' })
    }
  })
}
