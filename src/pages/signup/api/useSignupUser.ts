import type { UseFormReset } from 'react-hook-form'
import type { SignupSchema } from '../model/contract'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { sessionQueries } from '@/entities/user'

import { authClient, getAuthErrorMessage } from '@/shared/api'

export const useSignupUser = (reset: UseFormReset<SignupSchema>) => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: SignupSchema) => authClient.signUp.email(data),
    meta: {
      errorMessage: e => {
        if (e && 'error' in e) {
          return (
            getAuthErrorMessage(e.error.code) ??
            'An error occurred during sign-up. Our technical team has been notified. Please try again shortly.'
          )
        }
      }
    },
    onSuccess(session) {
      reset()
      queryClient.setQueryData(sessionQueries.all(), session)
      navigate({ to: '/dashboard' })
    }
  })
}
