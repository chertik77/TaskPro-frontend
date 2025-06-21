import type { UseFormReset } from 'react-hook-form'
import type { SigninSchema } from '../model/contract'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { sessionService, useSessionStore } from '@/entities/session'

export const useSigninUser = (reset: UseFormReset<SigninSchema>) => {
  const { authenticate } = useSessionStore()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: sessionService.signin,
    meta: {
      errorMessage: e =>
        e?.response?.status === 401
          ? 'The email or password you entered is incorrect. Please try again.'
          : 'An error occurred during sign-in. Our technical team has been notified. Please try again shortly.'
    },
    onSuccess(data) {
      reset()
      navigate({ to: '/dashboard' })
      authenticate(data)
    }
  })
}
