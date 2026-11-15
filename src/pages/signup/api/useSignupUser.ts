import type { UseFormReset } from 'react-hook-form'
import type { SignupSchema } from '../model/contract'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { refetchSession } from '@/entities/user'

import { authClient, authErrorMessage } from '@/shared/api'

export const useSignupUser = (reset: UseFormReset<SignupSchema>) => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: SignupSchema) => authClient.signUp.email(data),
    meta: {
      errorMessage: authErrorMessage(
        'An error occurred during sign-up. Our technical team has been notified. Please try again.'
      )
    },
    async onSuccess() {
      reset()
      await refetchSession(queryClient)
      navigate({ to: '/dashboard' })
    }
  })
}
