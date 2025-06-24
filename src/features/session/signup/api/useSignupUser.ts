import type { UseFormReset } from 'react-hook-form'
import type { SignupSchema } from '../model/contract'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { sessionService, useSessionStore } from '@/entities/session'

export const useSignupUser = (reset: UseFormReset<SignupSchema>) => {
  const { authenticate } = useSessionStore()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: sessionService.signup,
    meta: {
      errorMessage: e =>
        e?.response?.status === 409
          ? 'An account with this email address already exists. Please sign in or use a different email.'
          : 'An error occurred during sign-up. Our technical team has been notified. Please try again shortly.'
    },
    onSuccess(data) {
      reset()
      navigate({ to: '/dashboard' })
      authenticate(data)
    }
  })
}
