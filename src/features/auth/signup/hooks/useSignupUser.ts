import type { UseFormReset } from 'react-hook-form'
import type { SignupSchema } from '../signup.contract'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { authService } from '@/shared/api/auth'
import { useAuthStore } from '@/shared/store'

export const useSignupUser = (reset: UseFormReset<SignupSchema>) => {
  const { authenticate } = useAuthStore()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: authService.signup,
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
